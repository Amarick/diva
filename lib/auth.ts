"use client"

import { createContext, useContext, useState, useEffect, createElement, type ReactNode, type Context } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

export const AuthContext: Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    console.log("[v0] AuthProvider mounted, checking for existing session")
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      console.log("[v0] Found stored user:", storedUser)
      setUser(JSON.parse(storedUser))
    } else {
      console.log("[v0] No stored user found")
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    console.log("[v0] Login attempt for:", email)
    try {
      // Get stored users
      const usersData = localStorage.getItem("users")
      const users = usersData ? JSON.parse(usersData) : []
      console.log("[v0] Stored users:", users)

      // Find user
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        console.log("[v0] User not found or password incorrect")
        return { success: false, error: "E-mail ou senha incorretos" }
      }

      console.log("[v0] User found, creating session")
      // Create user session (without password)
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }

      setUser(userSession)
      localStorage.setItem("user", JSON.stringify(userSession))
      console.log("[v0] Session created, redirecting to dashboard")

      router.push("/dashboard")
      return { success: true }
    } catch (error) {
      console.error("[v0] Login error:", error)
      return { success: false, error: "Erro ao fazer login" }
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    console.log("[v0] Signup attempt for:", email)
    try {
      // Get existing users
      const usersData = localStorage.getItem("users")
      const users = usersData ? JSON.parse(usersData) : []
      console.log("[v0] Existing users:", users)

      // Check if user already exists
      const emailExists = await checkEmailExists(email)
      if (emailExists) {
        console.log("[v0] User already exists")
        return { success: false, error: "E-mail já cadastrado" }
      }

      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      console.log("[v0] New user created:", newUser.email)

      // Auto login after signup
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }

      setUser(userSession)
      localStorage.setItem("user", JSON.stringify(userSession))
      console.log("[v0] Auto-login successful, redirecting to dashboard")

      router.push("/dashboard")
      return { success: true }
    } catch (error) {
      console.error("[v0] Signup error:", error)
      return { success: false, error: "Erro ao criar conta" }
    }
  }

  const logout = () => {
    console.log("[v0] Logging out")
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return createElement(AuthContext.Provider, { value: { user, login, signup, logout, isLoading } }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export async function checkEmailExists(email: string): Promise<boolean> {
  if (typeof window === "undefined") return false

  console.log("[v0] Checking if email exists:", email)
  const usersData = localStorage.getItem("users")
  const users = usersData ? JSON.parse(usersData) : []
  console.log("[v0] Total users in database:", users.length)

  const exists = users.some((u: any) => u.email === email)
  console.log("[v0] Email exists:", exists)

  return exists
}

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  if (typeof window === "undefined") {
    return { success: false, message: "Erro ao redefinir senha" }
  }

  console.log("[v0] Attempting to reset password for:", email)

  try {
    const usersData = localStorage.getItem("users")
    const users = usersData ? JSON.parse(usersData) : []

    const userIndex = users.findIndex((u: any) => u.email === email)

    if (userIndex === -1) {
      console.log("[v0] User not found for password reset")
      return { success: false, message: "E-mail não encontrado" }
    }

    users[userIndex].password = newPassword
    localStorage.setItem("users", JSON.stringify(users))
    console.log("[v0] Password reset successful")

    return { success: true, message: "Senha redefinida com sucesso!" }
  } catch (error) {
    console.error("[v0] Password reset error:", error)
    return { success: false, message: "Erro ao redefinir senha" }
  }
}
