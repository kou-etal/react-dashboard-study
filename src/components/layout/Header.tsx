import { User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{user?.name}</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  )
}
