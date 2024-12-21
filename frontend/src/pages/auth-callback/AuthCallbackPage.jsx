import { useUser } from '@clerk/clerk-react'
import { Card, CardContent } from '@mui/material'
import { Loader } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { axiosInstance } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'


const AuthCallbackPage = () => {

  const { isLoaded, user } = useUser(); 
  const navigate = useNavigate();
  const syncAttempted = useRef(false) 
  useEffect(() => {
    const syncUser = async () => { 
      try {
        if (!isLoaded || !user | syncAttempted.current) return; // Kullanıcı yüklenmemişse bekle
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        syncAttempted.current = true;
      } catch (error) {
        console.error("Error syncing user:", error);
      } finally {
        navigate("/"); 
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="flex text-white h-screen w-full items-center justify-center bg-slate-600">
      <Card className="w-[90%] max-w-md bg-slate-700">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-[#9c27b0] animate-spin" />
          <h3 className="text-xl font-bold">Logging you in</h3>
          <p className="text-sm text-[#9c27b0]">Redirecting</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
