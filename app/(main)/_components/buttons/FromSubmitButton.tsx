import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

const FromSubmitButton = ({ buttonTitle, isSubmitting, className }: { buttonTitle: string, isSubmitting: boolean, className?: string }) => {
    return (
        <Button type="submit" disabled={isSubmitting} className={cn("w-full   ", className)}>
            {buttonTitle}
        </Button>
    )
}

export default FromSubmitButton