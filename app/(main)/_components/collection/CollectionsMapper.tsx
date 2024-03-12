"use client"
import { useCollectionContext } from '@/shared/context/CollectionsContext'
import React from 'react'
import DataLoader from '../DataLoader'
import CollectionCard from './CollectionCard'

export const CollectionsMapper = () => {

    const { collections } = useCollectionContext()

    return (
        <div className="flex flex-col gap-4 mt-6">
            {collections?.length >0 && collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div >
    )
}
