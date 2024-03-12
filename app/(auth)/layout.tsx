import { Boxes } from '@/shared/components/acernity/background-boxes'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="z-50 mx-auto my-auto">
                {children}
            </div>
            <Boxes />
        </>
    )
}

export default AuthLayout