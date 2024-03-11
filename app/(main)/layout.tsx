import { BackgroundBeams } from "@/shared/components/acernity/backgroun-beams";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center ">
      <div className="flex flex-grow w-full justify-center z-50">
        <div className="max-w-[920px] flex flex-col flex-grow px-4 py-12">
          {children}
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default layout;