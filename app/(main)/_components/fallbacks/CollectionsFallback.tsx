import { Skeleton } from "@/shared/components/ui/skeleton";

export function CollectionsFallback() {
    return (
        <div className="flex w-full mb-12">
            <div className="w-full text-4xl font-bold space-y-3 flex flex-col items-center">
                <Skeleton className="w-[95%] h-[36px]" />
                <Skeleton className="w-[95%] h-[36px]" />
                <Skeleton className="w-[95%] h-[36px]" />
                <Skeleton className="w-[95%] h-[36px]" />
                <Skeleton className="w-[95%] h-[36px]" />
            </div>
        </div>
    );
}