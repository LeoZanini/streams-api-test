'use server';
import { revalidatePath } from 'next/cache';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(endpoint: string) {
  const text = await fetch('https://jsonplaceholder.typicode.com' + endpoint)
    .then((res) => {
      const reader = res.body?.getReader();
      return new ReadableStream({
        async start(controller) {
          // The following function handles each data chunk
          async function push() {
            const { done, value } = (await reader?.read()) || {};
            // Introduce a delay between each chunk
            await delay(5); // 500ms delay, adjust as needed
            revalidatePath('/(sidebar)/simulate', 'page');

            if (done) {
              console.log('done', done);
              controller.close();

              return;
            }
            // Get the data and send it to the browser via the controller
            controller.enqueue(value);
            // Check chunks by logging to the console
            console.log(done, value);
            push();
          }
          push();
        }
      });
    })
    .then((stream) => new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text())
    .then((result) => {
      console.log(result);
      return result;
    });

  return text;
}
