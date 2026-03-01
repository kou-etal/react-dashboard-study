import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@clerk/clerk-react'

export function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
