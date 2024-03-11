import { currentUser } from '@clerk/nextjs'
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { getCollections } from '@/lib/db/query'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { WelcomeMessageFallback } from './_components/fallbacks/WelcomeMessageFallback'
import { UserCollectionsFallback } from './_components/fallbacks/UserCollectionsFallback'
import { Button } from '@/components/ui/button'
import { CreateCollectionBtn } from './_components/buttons/CreateCollectionBtn'

export default async function MainPage() {

    return (
        <>
            <Suspense fallback={<WelcomeMessageFallback />}>
                <WelcomeMessage />
            </Suspense>
            <Suspense fallback={<UserCollectionsFallback />}>
                <UserCollections />
            </Suspense>
        </>
    )
}

const WelcomeMessage = async () => {

    const user = await currentUser()
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

const UserCollections = async () => {
    const user = await currentUser()
    const collections = await getCollections(user?.id)

    if (collections.length === 0) {
        return (
            <div className='mt-12'>
                <Alert>
                    <Info className="size-5" />
                    <AlertTitle>
                        <span className='font-bold text-lg'>NO COLLECTIONS FOUND!</span>
                    </AlertTitle>
                    <AlertDescription className="">
                        Please add collections to get started!
                    </AlertDescription>
                </Alert>
                <CreateCollectionBtn />
            </div>
        )
    } else {
        return (
            <div className='mt-12'>
                Collections: {collections.length}
                <CreateCollectionBtn />
            </div>
        )
    }
}
