import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { CollectionAndTasksType, CreateCollectionTypes } from "../types/CollectionTypes"
import { useAuth } from "@clerk/nextjs"
import { Collection } from "@prisma/client";

type CollectionContextType = {
    collections: CollectionAndTasksType[] | undefined,
    setCollections: Dispatch<SetStateAction<CollectionAndTasksType[] | undefined>>,
    addCollection: (data: CreateCollectionTypes, userId: string, newCollectionId: string) => void,
    removeCollection: (id: string) => void;
    collectionsNameMap: Map<string, number>,
    initiateCollections: (collections: CollectionAndTasksType[]) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined)

export const CollectionContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [collections, setCollections] = useState<CollectionAndTasksType[] | undefined>(undefined)
    const [collectionsNameMap, setCollectionsNameMap] = useState<Map<string, number>>(new Map())

    const removeCollection = (id: string) => {
        setCollections((prevState) => prevState?.filter(collection => collection.id !== id))
    }

    const addCollection = (data: CreateCollectionTypes, userId: string, newCollectionId: string) => {

        const newCollection: CollectionAndTasksType = {
            id: newCollectionId,
            name: data.name,
            userId: userId,
            color: data.color,
            createdAt: new Date(),
            tasks: []
        }
        if (collections) {
            setCollections([...collections, newCollection])
        } else {
            setCollections([newCollection])
        }
        collectionsNameMap.set(data.name, 1)
        setCollectionsNameMap(new Map(collectionsNameMap))

    }

    const initiateCollections = (collections: CollectionAndTasksType[]) => {
        collections.map(collection => {
            collectionsNameMap.set(collection.name, 1)
        })
        setCollectionsNameMap(collectionsNameMap)
        setCollections(collections)
    }

    const optimistiAddCollection = () => {

    }

    const values = {
        collections,
        setCollections,
        addCollection,
        removeCollection,
        collectionsNameMap,
        initiateCollections
    }

    return (
        <CollectionContext.Provider value={values}>
            {children}
        </CollectionContext.Provider>
    )
}

export const useCollectionContext = (): CollectionContextType => {
    const context = useContext(CollectionContext)
    if (!context) {
        throw new Error("useCollectionContext must be used inside CollectionContextProvider")
    }
    return context
}