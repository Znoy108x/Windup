import React from 'react'
import Navbar from './_components/Navbar'
import { Separator } from '@/components/ui/separator'

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white dark:bg-black h-full w-full flex flex-col">
            <Navbar />
            <Separator />
            <div className="min-h-screen w-full flex flex-col items-center ">
                <div className="flex flex-grow w-full justify-center dark:bg-neutral-950">
                    <div className="max-w-[920px]  flex flex-col flex-grow p-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainAppLayout