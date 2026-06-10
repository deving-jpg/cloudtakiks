import type { Metadata } from "next";
import HeroTest from "@/components/HeroTest";
import { HomeBody } from "../page";

export const metadata: Metadata = {
  title: "Cloud Taktiks — Hero test",
  description: "Test clone of the homepage with the redesigned hero panel animation.",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <>
      <HeroTest />
      <HomeBody />
    </>
  );
}
