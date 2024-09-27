import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const question = {
    question: prompt,
  };
  const apiResponse = await fetch(
    // "https://api.dev.vhdo.org/api/ai/health-query",
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(question),
      body: JSON.stringify({ prompt }),
    }
  );

  if (!apiResponse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data from the external API" },
      { status: 500 }
    );
  }

  const apiData = await apiResponse.json();
  console.log(request, ";;;;;;");

  const response = new NextResponse(
    new ReadableStream({
      async start(controller) {
        let index = 0;
        const textToStream = `${JSON.stringify(apiData.prompt)}`;

        const timer = setInterval(() => {
          if (index < textToStream.length) {
            controller.enqueue(new TextEncoder().encode(textToStream[index]));
            index++;
          } else {
            clearInterval(timer);
            controller.close();
          }
        }, 20);
      },
    })
  );

  response.headers.append("Content-Type", "text/event-stream");
  response.headers.append("Cache-Control", "no-cache");
  response.headers.append("Connection", "keep-alive");

  return response;
}
