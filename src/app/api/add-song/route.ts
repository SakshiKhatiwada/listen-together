import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("listen_together");
    const collection = db.collection("songs");

    const newSong = {
      url,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newSong);
    return NextResponse.json(
      { message: "Added Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding song:", error);
    return NextResponse.json({ error: "Failed to add song" }, { status: 500 });
  }
}
