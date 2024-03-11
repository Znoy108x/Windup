"use client"
import { useEffect, useRef } from 'react'
import { useCollectionContext } from '../context/CollectionsContext'
import { CollectionAndTasksType } from '../types/CollectionTypes'

const InitCollections = ({ data }: { data: CollectionAndTasksType[] }) => {

    const collectionsRef = useRef(false)
    const {  initiateCollections } = useCollectionContext()

    useEffect(() => {
        if (!collectionsRef.current) {
            initiateCollections(data)
            collectionsRef.current = true
        }
    }, [])

    return null
}

export default InitCollections