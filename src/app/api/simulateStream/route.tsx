'use server';
import { revalidatePath } from 'next/cache';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(bytes: number) {
  const url = `https://httpbin.org/stream-bytes/${bytes}`;

  const data = await fetch(url).then((res) => res.json());
  const text = new TextDecoder();

  new Response(
    new ReadableStream({
      async start(controller) {
        for (const item of data) {
          await delay(500); // Simulate a delay for each item
          controller.enqueue(JSON.stringify(item) + '\n');
        }
        controller.close();
        revalidatePath('/');
      }
    }),
    { headers: { 'Content-Type': 'text/plain' } }
  );

  Response.body;
}
