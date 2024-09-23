import { Song } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const songs = await prisma.song.findMany();
  return NextResponse.json(songs, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, artist, cover, audio } = data;

  const song = await prisma.song.create({
    data: {
      name,
      artist,
      cover,
      audio,
    },
  });

  return NextResponse.json(song, { status: 201 });
}
