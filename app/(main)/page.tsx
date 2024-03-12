import { Suspense } from "react";
import { WelcomeMsgFallback } from "./_components/fallbacks/WelcomeMessageFallback";
import { CollectionsFallback } from "./_components/fallbacks/CollectionsFallback";
import { CollectionsList } from "./_components/collection/CollectionsList";
import { WelcomMsg } from "./_components/WelcomeMessage";
import dynamic from "next/dynamic";

// const GappyWrapper = dynamic(() => import("./_components/GappyWrapper"), {
//   ssr: false
// })

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomMsg />
      </Suspense>
      <Suspense fallback={<CollectionsFallback />}>
        <CollectionsList />
      </Suspense>
    </>
  );
}

