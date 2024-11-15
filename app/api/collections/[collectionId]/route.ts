import Collection from '@/lib/models/Collection';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: 'Collection not found' }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, {status: 200});
  } catch (error) {
    console.log('collecion_GET', error);

    return new NextResponse('Internal error', { status: 500 });
  }
};

export const POST = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    await connectToDB();

    const { title, description, image } = await req.json();

    let collection = await Collection.findById(params.collectionId);

    if (!title || !image) {
      return new NextResponse('Title and Image are required', { status: 400 });
    }

    if (!collection) {
      return new NextResponse('Collection not found', { status: 400 });
    }else{
      collection = await Collection.findByIdAndUpdate(params.collectionId, {
        title,
        description,
        image,
      });

      return NextResponse.json(collection, { status: 200 });
    }
  } catch (error) {
    console.log('[collections_POST]', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);

    return new NextResponse('Collection is deleted', { status: 200 });
  } catch (error) {
    console.log('collections_DELETE', error);

    return new NextResponse('Internal error', { status: 500 });
  }
};
