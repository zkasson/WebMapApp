"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SignInModalProps {
  onSignIn: (email: string) => void
}

export function SignInModal({ onSignIn }: SignInModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState("User1")
  const [password, setPassword] = useState("Password")
  const [isOpen, setIsOpen] = useState(false)

  // Update the handleSignIn function to validate with username instead of email
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Check if the credentials match our hardcoded user
    if (email === "User1" && password === "Password") {
      console.log("Sign in successful")
      onSignIn(email)
      setIsOpen(false)
    } else {
      // Show an error for invalid credentials
      alert("Invalid username or password. Please try again.")
    }
  }

  // Update the handleSignUp function to prevent new sign-ups
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // For this demo, we only allow the predefined user
    alert("New user registration is currently disabled. Please use the provided test account.")
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to initiate the password reset process
    alert("Instructions on how to reset the password will be emailed if this account exists.")
    setIsForgotPassword(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-sky-500 text-white border-sky-500 hover:bg-sky-400 hover:border-sky-400 hover:text-black"
        >
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Sign Up" : isForgotPassword ? "Forgot Password" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Create your account to get started."
              : isForgotPassword
                ? "Enter your email to reset your password."
                : "Enter your credentials to access your account."}
          </DialogDescription>
        </DialogHeader>
        {isForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                id="forgot-password-email"
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit" className="bg-sky-500 text-white hover:bg-sky-400 hover:text-black">
                Reset Password
              </Button>
              <Button
                variant="link"
                className="text-sky-500 hover:text-sky-400"
                onClick={() => setIsForgotPassword(false)}
              >
                Back to Sign In
              </Button>
            </div>
          </form>
        ) : isSignUp ? (
          <form onSubmit={handleSignUp} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit" className="bg-sky-500 text-white hover:bg-sky-400 hover:text-black">
                Sign Up
              </Button>
              <Button variant="link" className="text-sky-500 hover:text-sky-400" onClick={() => setIsSignUp(false)}>
                Back to Sign In
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit" className="bg-sky-500 text-white hover:bg-sky-400 hover:text-black">
                Sign In
              </Button>
              <div className="space-x-2">
                <Button variant="link" className="text-sky-500 hover:text-sky-400" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </Button>
                <Button
                  variant="link"
                  className="text-sky-500 hover:text-sky-400"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

