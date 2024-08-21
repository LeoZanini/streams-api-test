import { GET } from '../api/simulateStream/route';

export default async function Simulate() {
  const streamContent = await GET(1000);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex-col space-y-2 h-full overflow-auto rounded-md pb-10">
        <div>{streamContent}</div>
      </div>
    </div>
  );
}
