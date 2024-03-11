import { Skeleton } from "@/components/ui/skeleton"

export const WelcomeMessageFallback = () => {
    return (
        <div className="flex w-full">
            <h1 className="text-4xl font-bold space-y-3">
                <Skeleton className="w-[200px] h-[36px]" />
                <Skeleton className="w-[200px] h-[36px]" />
            </h1>
        </div >
    )
}