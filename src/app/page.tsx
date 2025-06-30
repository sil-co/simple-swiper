import SwipeFeed from "@/components/SwiperFeed";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <SwipeFeed />
    </main>
  );
}
