import { Loader } from 'lucide-react'
import React from 'react'

const DataLoader = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <Loader className="size-6 text-white animate-spin" />
        </div>
    )
}

export default DataLoader