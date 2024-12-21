import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'

import { Loader } from 'lucide-react'
import { axiosInstance } from '../lib/axios'

const updateApiToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider = ({ children }) => {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true) // Fix state declaration

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken()
                console.log(token)
                updateApiToken(token)
            } catch (error) {
                updateApiToken(null)
                console.log("Error in auth provider")
            } finally {
                setLoading(false)
            }
        }

        initAuth()
    }, [getToken])

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader className="size-8 text-white animate-spin" />
            </div>
        )
    }

    return <>{children}</>
}

export default AuthProvider
