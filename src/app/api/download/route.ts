// app/api/download/route.ts
import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    const audioStream = ytdl(url, { filter: "audioonly" });

    // @ts-ignore
    const response = new NextResponse(audioStream);
    response.headers.set("Content-Type", "audio/mpeg");
    response.headers.set(
      "Content-Disposition",
      'attachment; filename="audio.mp3"'
    );
    return response;
  } catch (error) {
    console.error("Error downloading the video:", error);
    return NextResponse.json(
      { error: "Error downloading the video" },
      { status: 500 }
    );
  }
}
