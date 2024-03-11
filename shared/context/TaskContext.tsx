import { createContext, useContext } from "react"

type TaskContextType = {}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {

    const values = {}

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