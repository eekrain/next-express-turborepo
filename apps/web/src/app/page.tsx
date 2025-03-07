"use client";

import { GetTest } from "~/components/test";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-semibold text-red-600 underline">
        Hello world!
      </h1>

      <GetTest />
    </div>
  );
}
