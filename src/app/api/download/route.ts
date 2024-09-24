import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import { Readable } from "stream";
import { url } from "inspector";

function nodeReadableToWebReadable(nodeReadable: Readable) {
  return new ReadableStream({
    start(controller) {
      nodeReadable.on("data", (chunk) => {
        controller.enqueue(chunk);
      });

      nodeReadable.on("end", () => {
        controller.close();
      });

      nodeReadable.on("error", (err) => {
        controller.error(err);
      });
    },
  });
}


export async function GET(req: Request) {
  try {
    // You can keep the dynamic URL fetch or hardcode it for testing
    // const { videoURL } = await req.json();
    const videoURL = "https://www.youtube.com/watch?v=f8arpOUQc-E";

    if (!videoURL) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400 }
      );
    }

    // Fetch video information
    const videoInfo = await ytdl.getInfo(videoURL);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");

    let urls: string[] = []; // Initialize an empty array

    audioFormats.forEach((item: any) => {
      urls.push(item.url);
    });

    // Extract video details
    const videoDetails = {
      title: videoInfo.videoDetails.title,
      author: videoInfo.videoDetails.author.name,
      rating: videoInfo.videoDetails.averageRating, // Use averageRating directly
    };

    // Return video details as JSON
    return NextResponse.json({ audioFormats, videoDetails }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching video info:", error);
    return NextResponse.json(
      { error: error.message || "Error fetching video info" },
      { status: 500 }
    );
  }
}

// const nodeStream = ytdl(videoURL, {
//   quality: "highestaudio",
//   filter: "audioonly",
// });

// nodeStream.on("response", (res) => {
//   if (res.statusCode === 403) {
//     throw new Error("Access forbidden to the video");
//   }
// });

// // Convert the Node.js Readable stream to a Web ReadableStream
// const webStream = nodeReadableToWebReadable(nodeStream);

// // Create a new response with the web-compatible ReadableStream
// const response = new NextResponse(webStream, {
//   headers: {
//     "Content-Disposition": 'attachment; filename="audio.mp3"',
//     "Content-Type": "audio/mpeg",
//   },
// });

// return response;
