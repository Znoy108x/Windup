import { createContext, useContext, useState } from "react"
import { useCollectionContext } from "./CollectionsContext"
import { CreateTaskType } from "../types/TaskTypes"
import { CollectionAndTasksType } from "../types/CollectionTypes"
import { Task } from "@prisma/client"
import { format } from "date-fns"

type TaskContextType = {
    addTaskToCollectionState: (data: CreateTaskType) => void
    undoAddTaskToCollectionState: (collectionId: string, taskId: string) => void
    updateTaskStatus: (collectionId: string, taskId: string) => void
    undoTaskStatus: (collectionId: string, taskId: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {

    const { collections, setCollections, taskMap, setTaskMap, completedTaskStartIndexMap, setCompletedTaskStartIndexMap } = useCollectionContext()

    const incrementCompletedTaskStartIndex = (collectionId: string, increaseBy: number) => {
        completedTaskStartIndexMap.set(collectionId, increaseBy)
        setCompletedTaskStartIndexMap(completedTaskStartIndexMap)
    }

    const placeTaskInRightPlace = (oldTasks: Task[], newTask: Task, collectionId: string): Task[] => {
        const oldTaskArr = oldTasks;
        const indexToInsertOn = completedTaskStartIndexMap.get(collectionId)
        if (indexToInsertOn) {
            oldTaskArr.splice(indexToInsertOn, 0, newTask)
            incrementCompletedTaskStartIndex(collectionId, indexToInsertOn + 1)
            return oldTaskArr
        } else {
            return [...oldTasks, newTask]
        }
    }

    const addTaskToCollectionState = (data: CreateTaskType) => {

        if (!taskMap.get(`${data.collectionId}-${data.id}`)) {
            const newTask: Task = {
                ...data,
                done: false,
                createdAt: new Date(),
                expiresAt: data.expiresAt || null
            }

            taskMap.set(`${data.collectionId}-${data.id}`, 1)
            setTaskMap(taskMap)

            const updatedCollections: CollectionAndTasksType[] = collections.map(collection => {
                if (collection.id === data.collectionId) {
                    return {
                        ...collection,
                        tasks: placeTaskInRightPlace(collection.tasks, newTask, collection.id)
                    };
                } else {
                    return collection;
                }
            });
            setCollections(updatedCollections);
        }
    }

    const undoAddTaskToCollectionState = (collectionId: string, taskId: string) => {
        if (taskMap.get(`${collectionId}-${taskId}`)) {

            const updatedCollections = collections.map(collection => {
                const updatedTasks = collection.tasks.filter(task => task.id !== taskId);
                return {
                    ...collection,
                    tasks: updatedTasks
                };
            });

            setCollections(updatedCollections);
            taskMap.delete(`${collectionId}-${taskId}`)
        }
    }

    const updateTaskStatus = (collectionId: string, taskId: string) => {
        if (taskMap.get(`${collectionId}-${taskId}`)) {
            const updatedCollections: CollectionAndTasksType[] = [];
            collections.forEach(collection => {
                if (collection.id === collectionId) {
                    let latestUpdatedTask: Task = {} as Task;
                    let unchangedTasks: Task[] = []
                    collection.tasks.forEach((task, index) => {
                        if (task.id === taskId) {
                            const placingIndex = completedTaskStartIndexMap.get(collectionId)
                            if (!placingIndex) {
                                incrementCompletedTaskStartIndex(collectionId, collection.tasks.length - 1)
                            } else {
                                incrementCompletedTaskStartIndex(collectionId, placingIndex - 1)
                            }
                            latestUpdatedTask = { ...task, done: true };
                        } else {
                            unchangedTasks.push(task)
                        }
                    });
                    const newUpdatedTaskList = [...unchangedTasks, latestUpdatedTask]
                    updatedCollections.push({ ...collection, tasks: newUpdatedTaskList });
                } else {
                    updatedCollections.push(collection);
                }
            });
            setCollections(updatedCollections)
        }
    }

    const undoTaskStatus = (collectionId: string, taskId: string) => {
        if (taskMap.get(`${collectionId}-${taskId}`)) {
            const updatedCollections: CollectionAndTasksType[] = [];
            collections.forEach(collection => {
                if (collection.id === collectionId) {
                    let latestUpdatedTask: Task = {} as Task;
                    let unchangedTasks: Task[] = []
                    collection.tasks.forEach((task, index) => {
                        if (task.id === taskId) {
                            incrementCompletedTaskStartIndex(collectionId, index + 1)
                            latestUpdatedTask = { ...task, done: false };
                        } else {
                            unchangedTasks.push(task)
                        }
                    });
                    const newUpdatedTaskList = [...unchangedTasks, latestUpdatedTask]
                    updatedCollections.push({ ...collection, tasks: newUpdatedTaskList });
                } else {
                    updatedCollections.push(collection);
                }
            });
            setCollections(updatedCollections)
        }
    }

    const values = {
        addTaskToCollectionState,
        undoAddTaskToCollectionState,
        updateTaskStatus,
        undoTaskStatus
    }

    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useCollectionContext must be used inside CollectionContextProvider")
    }
    return context
}