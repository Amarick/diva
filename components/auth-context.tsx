"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Get stored users
      const usersData = localStorage.getItem("users")
      const users = usersData ? JSON.parse(usersData) : []

      // Find user
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        return { success: false, error: "E-mail ou senha incorretos" }
      }

      // Create user session (without password)
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }

      setUser(userSession)
      localStorage.setItem("user", JSON.stringify(userSession))

      router.push("/dashboard")
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erro ao fazer login" }
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Get existing users
      const usersData = localStorage.getItem("users")
      const users = usersData ? JSON.parse(usersData) : []

      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
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

      // Auto login after signup
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }

      setUser(userSession)
      localStorage.setItem("user", JSON.stringify(userSession))

      router.push("/dashboard")
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erro ao criar conta" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
