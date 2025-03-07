import type { AppProps } from "next/app";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "~/globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontTitle = Plus_Jakarta_Sans({
  variable: "--font-title",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`${fontSans.variable} ${fontTitle.variable} font-sans antialiased`}
      >
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
