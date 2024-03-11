import { Skeleton } from "@/components/ui/skeleton";

export function WelcomeMsgFallback() {
    return (
        <div className="flex w-full mb-12">
            <h1 className="text-4xl font-bold space-y-3">
                <Skeleton className="w-[80px] h-[36px]" />
                <Skeleton className="w-[230px] h-[70px] " />
            </h1>
        </div>
    );
}