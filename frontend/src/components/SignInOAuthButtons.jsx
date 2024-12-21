import { useSignIn } from '@clerk/clerk-react'
import { Button } from '@mui/material'
import React from 'react'

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn()

    if (!isLoaded) return null

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        })
    }

    return (
    <Button onClick={signInWithGoogle} variant='contained' color='secondary' className= "w-full text-white  h-11">
        Continue With Google
    </Button>
    )
}

export default SignInOAuthButtons
