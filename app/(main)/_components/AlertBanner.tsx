import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Info } from "lucide-react"

interface Props {
    title: string,
    description: string
}

const AlertBanner = ({ title, description }: Props) => {
    return (
        <Alert>
            <Info className="size-6 mt-1" />
            <AlertTitle className="font-bold text-3xl ml-3">{title}</AlertTitle>
            <AlertDescription className="text-md ml-3">{description}</AlertDescription>
        </Alert>
    )
}

export default AlertBanner