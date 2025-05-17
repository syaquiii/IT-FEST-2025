import Image from "next/image";
import Cat from "@/assets/img/cat.png";
export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] bg-blue-500 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-center text-4xl w-full">Welcome To IT FEST 2025</h1>
        <Image className="animate-bounce " src={Cat} alt="cat" />
      </section>
    </main>
  );
}
