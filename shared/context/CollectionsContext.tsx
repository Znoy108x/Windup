import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { CollectionAndTasksType, CreateCollectionTypes } from "../types/CollectionTypes"

type CollectionContextType = {
    collections: CollectionAndTasksType[],
    setCollections: Dispatch<SetStateAction<CollectionAndTasksType[]>>,
    addCollection: (data: CreateCollectionTypes, userId: string, newCollectionId: string) => void,
    removeCollection: (id: string) => void;
    collectionsNameMap: Map<string, number>,
    initiateCollections: (collections: CollectionAndTasksType[]) => void;
    deleteCollection: (collection: CollectionAndTasksType) => void,
    undoOptimisticDelete: (collection: CollectionAndTasksType) => void
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined)

export const CollectionContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [collections, setCollections] = useState<CollectionAndTasksType[]>([])
    const [collectionsNameMap, setCollectionsNameMap] = useState<Map<string, number>>(new Map())

    const removeCollection = (id: string) => {
        setCollections((prevState) => prevState?.filter(collection => collection.id !== id))
    }

    const addCollection = (data: CreateCollectionTypes, userId: string, newCollectionId: string) => {
        if (!collectionsNameMap.get(data.name)) {
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
    }

    useEffect(() => {
        console.log(collections)
    }, [collections])

    const undoOptimisticDelete = (collection: CollectionAndTasksType) => {
        if (!collectionsNameMap.get(collection.name)) {
            setCollections([...collections, collection])
            collectionsNameMap.set(collection.name, 1)
            setCollectionsNameMap(new Map(collectionsNameMap))
        }
    }

    const deleteCollection = (collection: CollectionAndTasksType) => {
        if (collectionsNameMap.get(collection.name)) {
            const { id, name } = collection
            setCollections(prevState => prevState.filter(collection => collection.id !== id))
            collectionsNameMap.delete(name)
            setCollectionsNameMap(collectionsNameMap)
        }
    }

    const initiateCollections = (collections: CollectionAndTasksType[]) => {
        if (collections.length > 0) {
            collections.map(collection => {
                collectionsNameMap.set(collection.name, 1)
            })
            setCollections(collections)
            setCollectionsNameMap(collectionsNameMap)
        } else {
            setCollections([])
        }
    }

    const optimistiAddCollection = () => {

    }

    const values = {
        collections,
        setCollections,
        addCollection,
        removeCollection,
        collectionsNameMap,
        initiateCollections,
        deleteCollection,
        undoOptimisticDelete
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