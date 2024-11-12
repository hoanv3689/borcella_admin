import { connectToDB } from "@/lib/mongoDB";

export default async function Home() {
  connectToDB();

  return (
    <div>
      Home
    </div>
  );
}
