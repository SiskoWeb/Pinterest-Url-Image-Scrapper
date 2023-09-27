"use client";
import { headers } from "next/dist/client/components/headers";
import { FormEvent, useState } from "react";
import Loader from "./components/Loader";
export default function Home() {
  const [keyword, setKeyword] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("start");
    setIsLoading(true);

    if (keyword === "") {
      setIsLoading(false);
      
      return;
    }
    const res = await fetch("api/scrapping", {
      method: "POST",
      body: JSON.stringify({ keyword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    console.log(res);
    console.log(data);
    setIsLoading(false);
    setKeyword("");
    console.log("done");
  };
  return (
    <div className="  relative bg-gray-900 min-h-screen flex items-center justify-center">
      <main className=" flex flex-col min-h-screen items-center justify-center gap-20">
        <section>
          <h1 className="text-white font-bold text-center md:text-8xl text-6xl">
            Start tracking
          </h1>
        </section>

        {isLoading ? <Loader /> : null}

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-3  "
        >
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-md p-3"
            type="text"
            placeholder="name Wallpaper"
          />

          <button className="bg-[#2a66f9] text-white rounded-md font-bold cursor-pointer px-6 py-2">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
