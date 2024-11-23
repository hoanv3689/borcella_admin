import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    await connectToDB();

    const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json();

    const existingProduct = await Product.findOne({ title });

    if (existingProduct) {
      return new NextResponse('Product already exists', { status: 400 });
    }

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse('Not enough data to create product', { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("products_POST", error);
    return new NextResponse("Internal Error" + error, {status: 500})
  }
}