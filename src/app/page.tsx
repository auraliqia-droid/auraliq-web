import { Suspense } from "react";
import { LandingPage } from "@/components/landing/LandingPage";

export default function Home() {
  return (
    <Suspense>
      <LandingPage />
    </Suspense>
  );
}
