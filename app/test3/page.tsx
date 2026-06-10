import type { Metadata } from "next";
import Hero3 from "@/components/Hero3";
import { HomeBody } from "../page";

export const metadata: Metadata = {
  title: "Cloud Taktiks — Hero test 3 (Tunnel)",
  robots: { index: false, follow: false },
};

export default function Test3Page() {
  return (
    <>
      <Hero3 />
      <HomeBody />
    </>
  );
}
