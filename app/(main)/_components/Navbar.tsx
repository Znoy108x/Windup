import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between p-4 px-8 h-[60px]">
            <Logo />
            <div className="flex items-center gap-x-4">
                <UserButton afterSignOutUrl='/sign-in' />
                <ThemeSwitcher />
            </div>
        </nav>
    )
}

export default Navbar