import type { Metadata } from "next";
import PreziStage from "@/components/PreziStage";

export const metadata: Metadata = {
  title: "Cloud Taktiks — Hero test 5 (Prezi fly)",
  robots: { index: false, follow: false },
};

export default function Test5Page() {
  return <PreziStage />;
}
