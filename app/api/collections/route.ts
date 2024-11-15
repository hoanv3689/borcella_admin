import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import Collection from '@/lib/models/Collection';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const collections = await Collection.find().sort({ createdAt: 'desc' });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.log('[collections_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    await connectToDB();

    const { title, description, image } = await req.json();

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse('Collection already exists', { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse('Title and Image are required', { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    console.log('[collections_POST]', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
