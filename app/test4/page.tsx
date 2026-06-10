import type { Metadata } from "next";
import Hero4 from "@/components/Hero4";
import { HomeBody } from "../page";

export const metadata: Metadata = {
  title: "Cloud Taktiks — Hero test 4 (Kinetic)",
  robots: { index: false, follow: false },
};

export default function Test4Page() {
  return (
    <>
      <Hero4 />
      <HomeBody />
    </>
  );
}
