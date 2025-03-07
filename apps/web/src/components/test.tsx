"use client";

import { useEffect, useState } from "react";

import type { GetTestResponse } from "@monorepo/types";
import { Loader2 } from "lucide-react";

import { cn } from "~/lib/utils";

import { Card, CardContent, CardHeader } from "./ui/card";

export const GetTest = () => {
  const [test, setTest] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const URL_TEST = `${process.env.NEXT_PUBLIC_API_URL}/example/test`;
  console.log("🚀 ~ GetTest ~ URL_TEST:", URL_TEST);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(URL_TEST);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: GetTestResponse = await response.json();
        setTimeout(() => {
          setTest(data.message);
          setLoading(false);
        }, 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };
    fetchTest();
  }, []);

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <h3
          className={cn(
            "text-xl font-semibold",
            loading && "text-yellow-500",
            test && !error && "text-green-500",
            error && "text-red-500"
          )}
        >
          Express backend test
        </h3>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{URL_TEST}</p>

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Hitting API connection...
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-500">{test}</p>
        )}
      </CardContent>
    </Card>
  );
};
