"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CreateCollectionSheet from "../sheets/CreateCollectionSheet"

export const CreateCollectionBtn = () => {

    const [open, setOpen] = useState(false)
    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] mt-3">
                <Button variant={"outline"} className="dark:text-white w-full dark:bg-neutral-950 bg-white" onClick={toggleOpen}>
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                        Create Collection
                    </span>
                </Button>
            </div>
            <CreateCollectionSheet open={open} toggleOpen={toggleOpen} />
        </>
    )
}