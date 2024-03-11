"use client"
import React, { Fragment } from 'react'
import { CollectionContextProvider } from '../context/CollectionsContext'
import { TaskContextProvider } from '../context/TaskContext'
import { ThemeProvider } from './ThemeProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Fragment>
            <ThemeProvider>
                <CollectionContextProvider>
                    <TaskContextProvider>
                        {children}
                    </TaskContextProvider>
                </CollectionContextProvider>
            </ThemeProvider>
        </Fragment>
    )
}

export default Providers