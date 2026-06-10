import type { Metadata } from "next";
import Hero2 from "@/components/Hero2";
import { HomeBody } from "../page";

export const metadata: Metadata = {
  title: "Cloud Taktiks — Hero test 2 (Explosion)",
  robots: { index: false, follow: false },
};

export default function Test2Page() {
  return (
    <>
      <Hero2 />
      <HomeBody />
    </>
  );
}
