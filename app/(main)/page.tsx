import { currentUser } from '@clerk/nextjs'
import React, { Suspense } from 'react'
import { Loader } from "lucide-react"
import { Skeleton } from '@/components/ui/skeleton'

export default async function MainPage() {

    return (
        <Suspense fallback={<WelcomeMessageFallback />}>
            <WelcomeMessage />
        </Suspense>
    )
}

const WelcomeMessage = async () => {
    const user = await currentUser()
    console.log(user)
    if (!user) {
        return <div>error</div>
    }

    return (
        <div className="flex w-full">
            <h1 className="text-4xl font-bold">
                Welcome, <br />{user.firstName
                } {user.lastName}
            </h1>
        </div >
    )
}

const WelcomeMessageFallback = () => {
    return (
        <div className="flex w-full">
            <h1 className="text-4xl font-bold space-y-3">
                <Skeleton className="w-[200px] h-[36px]" />
                <Skeleton className="w-[200px] h-[36px]" />
            </h1>
        </div >
    )
}