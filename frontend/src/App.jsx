import { Button } from "@mui/material"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {


  return (
    <>
      <SignedOut>
        <SignInButton >
          <Button variant="contained" color="success">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </>
  )
}

export default App
