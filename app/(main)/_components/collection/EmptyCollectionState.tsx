"use client"
import React, { useContext } from 'react'
import AlertBanner from '../AlertBanner'
import { useCollectionContext } from '@/shared/context/CollectionsContext'

const EmptyCollectionState = () => {

    const { collections } = useCollectionContext()

    return (
        <>
            {
                collections?.length === 0 && <AlertBanner title="EMPTY" description="Please create collections to move further!" />
            }
        </>
    )
}

export default EmptyCollectionState