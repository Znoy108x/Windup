"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/ui/button";
import CreateCollectionSheet from "./CreateCollectionSheet";
import { useChat } from "@gappy/gappy-react"

function CreateCollectionBtn() {

  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  // const { registerClientFunction } = useChat()

  // const createCollection = () => {
  //   setOpen(true)
  // }

  // const createCollectionDescription = {
  //   "name": "createCollection",
  //   "description": "I want to creeate a collection.",
  //   "parameters": {
  //   }
  // }

  // useEffect(() => {
  //   registerClientFunction(createCollectionDescription, createCollection)

  // }, [])

  return (
    <div
      className="
    w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] my-5"
    >
      <Button
        variant={"outline"}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
          Create collection
        </span>
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}

export default CreateCollectionBtn;
