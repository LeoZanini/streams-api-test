import { Suspense } from 'react';
import { GET } from '../api/simulateStream/route';

export default async function Simulate() {
  const data = await GET('/users');

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex-col space-y-2 h-full overflow-auto rounded-md pb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <div>{data}</div>
        </Suspense>
      </div>
    </div>
  );
}
