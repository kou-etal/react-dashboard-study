import { SignIn, useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router'

export function Login() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <SignIn
        routing="hash"
        afterSignInUrl="/"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
          },
        }}
      />
    </div>
  )
}
