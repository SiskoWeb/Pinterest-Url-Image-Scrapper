"use client";

import { FormEvent } from "react";
export default function Home() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("start");

    const res = await fetch("api/scrapping");
    const data = await res.json();

    console.log(res);
    console.log(data);
    console.log("done");
  };
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <main className=" flex flex-col min-h-screen items-center justify-center gap-20">
        <section>
          <h1 className="text-white font-bold text-center md:text-8xl text-6xl">
            Start tracking <br></br>your apps{" "}
          </h1>
        </section>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-3  "
        >
          <input className="rounded-md p-3" type="text" placeholder="Email" />

          <button className="bg-[#2a66f9] text-white rounded-md font-bold cursor-pointer px-6 py-2">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
