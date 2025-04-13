"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SignInModal } from "@/components/sign-in-modal"
import { ProfileIcon } from "@/components/profile-icon"

interface HeaderProps {
  onAuthChangeAction: (isAuthenticated: boolean) => void
}

export function Header({ onAuthChangeAction }: HeaderProps) {
  // User state management
  const [user, setUser] = useState<{ email: string } | null>(null)

  // Update authentication state when user changes
  useEffect(() => {
    onAuthChangeAction(user !== null)
  }, [user, onAuthChangeAction])

  // Authentication handlers
  const handleSignIn = (email: string) => {
    setUser({ email })
  }

  const handleSignOut = () => {
    setUser(null)
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 rounded-lg shadow-sm text-white">
      <Link href="/" className="text-4xl font-bold text-white">
        CartoTick
      </Link>
      {user ? <ProfileIcon email={user.email} onSignOut={handleSignOut} /> : <SignInModal onSignIn={handleSignIn} />}
    </div>
  )
}

