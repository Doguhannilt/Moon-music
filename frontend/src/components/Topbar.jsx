import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButtons';

const Topbar = () => {
    const isAdmin = false;
    return (
        <div className='flex text-white  items-center justify-between border-b-2 border-gray-600 p-4 sticky top-0 backdrop-blur-lg z-10'>
            <div className='flex text-2xl font-bold  gap-2 items-center text-white'>
                MOON
            </div>
            <div className='flex items-center gap-4'>
                {isAdmin && (
                    <Link> to={'/admin'}
                        <LayoutDashboardIcon className='size-4 mr-2' />
                        Admin Dashboard
                    </Link>
                )}

                <SignedIn>
                    <SignOutButton />
                </SignedIn>

                <SignedOut>
                    < SignInOAuthButtons />
                </SignedOut>
            </div>
        </div>
    )
}

export default Topbar
