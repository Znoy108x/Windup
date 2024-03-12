import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { CollectionAndTasksType, CreateCollectionTypes } from "../types/CollectionTypes"
import { Task } from "@prisma/client";

type CollectionContextType = {
    collections: CollectionAndTasksType[],
    setCollections: Dispatch<SetStateAction<CollectionAndTasksType[]>>,
    addCollection: (data: CreateCollectionTypes, userId: string, newCollectionId: string) => void,
    removeCollection: (id: string) => void;
    collectionsNameMap: Map<string, number>,
    initiateCollections: (collections: CollectionAndTasksType[]) => void;
    deleteCollection: (collection: CollectionAndTasksType) => void,
    undoOptimisticDelete: (collection: CollectionAndTasksType) => void,
    taskMap: Map<string, number>,
    setTaskMap: Dispatch<SetStateAction<Map<string, number>>>,
    setCompletedTaskStartIndexMap: Dispatch<SetStateAction<Map<string, number>>>,
    completedTaskStartIndexMap: Map<string, number>
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined)

export const CollectionContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [collections, setCollections] = useState<CollectionAndTasksType[]>([])
    const [taskMap, setTaskMap] = useState<Map<string, number>>(new Map())
    const [collectionsNameMap, setCollectionsNameMap] = useState<Map<string, number>>(new Map())
    const [completedTaskStartIndexMap, setCompletedTaskStartIndexMap] = useState<Map<string, number>>(new Map())

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
        console.log({ collections })
    }, [collections])
    useEffect(() => {
        console.log({ completedTaskStartIndexMap })
    }, [completedTaskStartIndexMap])
    useEffect(() => {
        console.log({ taskMap })
    }, [taskMap])


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

    const initTasks = (collectionId: string, tasks: Task[], newTasksMap: Map<string, number>) => {
        let isFoundCompletedStartIndex = false;
        tasks.forEach((task, index) => {
            newTasksMap.set(`${collectionId}-${task.id}`, 1);
            if (!isFoundCompletedStartIndex && task.done) {
                isFoundCompletedStartIndex = true;
                completedTaskStartIndexMap.set(`${collectionId}`, index)
                setCompletedTaskStartIndexMap(completedTaskStartIndexMap)
            }
        });
    }

    const initiateCollections = (collections: CollectionAndTasksType[]) => {
        if (collections.length > 0) {
            const newTasksMap: Map<string, number> = new Map()
            const newCollectionNameMap: Map<string, number> = new Map()
            collections.forEach(collection => {
                newCollectionNameMap.set(collection.name, 1)
                initTasks(collection.id, collection.tasks, newTasksMap)
            })
            setCollections(collections)
            setTaskMap(newTasksMap)
            setCollectionsNameMap(newCollectionNameMap)
        } else {
            setCollections([])
        }
    }

    const values = {
        collections,
        setCollections,
        addCollection,
        removeCollection,
        collectionsNameMap,
        initiateCollections,
        deleteCollection,
        undoOptimisticDelete,
        taskMap,
        setTaskMap,
        setCompletedTaskStartIndexMap,
        completedTaskStartIndexMap
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