import { Suspense } from "react";
import { WelcomeMsgFallback } from "./_components/fallbacks/WelcomeMessageFallback";
import { CollectionsFallback } from "./_components/fallbacks/CollectionsFallback";
import { CollectionsList } from "./_components/CollectionsList";
import { WelcomMsg } from "./_components/WelcomeMessage";

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

