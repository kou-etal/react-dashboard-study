import { UserButton } from '@clerk/clerk-react'

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <UserButton afterSignOutUrl="/login" />
    </header>
  )
}
