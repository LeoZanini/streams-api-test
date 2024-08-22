'use server';

// export async function GET(bytes: number) {
//   const url = `http://localhost:8080/apiTest/${bytes}`;

//   try {
//     const response = await fetch(url);
//     const reader = response.body?.getReader();
//     const textDecoder = new TextDecoder();

//     if (!reader) {
//       return new Response('Error: Unable to read stream', { status: 500 });
//     }

//     const stream = new ReadableStream({
//       async start(controller) {
//         let receivedData = '';
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           // Decode the received chunk
//           const decodedChunk = textDecoder.decode(value, { stream: true });
//           receivedData += decodedChunk;

//           console.log('Received chunk:', decodedChunk);
//         }
//         controller.close();
//       }
//     });

//     return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response('Error: Failed to fetch and stream data', { status: 500 });
//   }
// }

export async function fetchAndDecodeStream(url: string) {
  try {
    const response = await fetch(url);
    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error('Error: Unable to read stream');
    }

    const textDecoder = new TextDecoder();
    let receivedData = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the received chunk
      const decodedChunk = textDecoder.decode(value, { stream: true });
      receivedData += decodedChunk;

      // console.log('Received chunk:', decodedChunk);
    }

    // console.log('Complete stream:', receivedData);

    // If you expect the data to be JSON
    try {
      const parsedData = JSON.parse(receivedData);
      // console.log('Parsed data:', parsedData);
      new Response (JSON.stringify(parsedData), { headers: { 'Content-Type': 'application/json' } });
      return parsedData
    } catch (error) {
      // console.error('Failed to parse JSON:', error);
      const parsedData = JSON.parse(receivedData);
      return new Response(parsedData); // Return as string if not JSON
    }

  } catch (error) {
    console.error('Error:', error);
    return 'Error: Failed to fetch and decode stream';
  }
}
