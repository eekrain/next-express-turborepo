"use client";

import { Leaf } from "lucide-react";

import { GetTest } from "~/components/test";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="text-3xl font-semibold text-red-600 underline">
      <p>Kontol kau</p>
      <Button onClick={() => alert("Test")}>Apa anjg?</Button>
      <Leaf />

      <GetTest />
    </div>
  );
}
