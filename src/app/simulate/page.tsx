'use server';
import { fetchAndDecodeStream } from '../api/simulateStream/route';
import { Suspense } from 'react';
import { StreamableTextLoader } from '../components/StreamableTextLoader';

export default async function Simulate() {
  const response = await fetchAndDecodeStream('http://localhost:8080/stream/10');
  console.log(response.data)
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex-col space-y-2 h-full overflow-auto rounded-md pb-10">
        <Suspense fallback={<>loading</>}>
          <StreamableTextLoader className={'bg-white w-10 h-10'} data={response.data} className={'bg-white text-black w-40 rounded-full m-4'}/>
        </Suspense>
      </div>
    </div>
  );
}
