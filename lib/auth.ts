export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: Omit<User, "password">
}

// Get all users from localStorage
function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("users", JSON.stringify(users))
}

// Register a new user
export function registerUser(name: string, email: string, password: string): AuthResponse {
  const users = getUsers()

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return {
      success: false,
      message: "Este e-mail já está cadastrado",
    }
  }

  // Create new user
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // In production, this should be hashed
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  // Set current user
  const { password: _, ...userWithoutPassword } = newUser
  localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

  return {
    success: true,
    message: "Conta criada com sucesso!",
    user: userWithoutPassword,
  }
}

// Login user
export function loginUser(email: string, password: string): AuthResponse {
  const users = getUsers()

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      message: "E-mail ou senha incorretos",
    }
  }

  // Set current user
  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

  return {
    success: true,
    message: "Login realizado com sucesso!",
    user: userWithoutPassword,
  }
}

// Get current logged in user
export function getCurrentUser(): Omit<User, "password"> | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

// Logout user
export function logoutUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("currentUser")
}

// Reset password
export function resetPassword(email: string, newPassword: string): AuthResponse {
  const users = getUsers()
  const userIndex = users.findIndex((u) => u.email === email)

  if (userIndex === -1) {
    return {
      success: false,
      message: "E-mail não encontrado",
    }
  }

  users[userIndex].password = newPassword
  saveUsers(users)

  return {
    success: true,
    message: "Senha redefinida com sucesso!",
  }
}

// Check if email exists (for password recovery)
export function checkEmailExists(email: string): boolean {
  const users = getUsers()
  return users.some((u) => u.email === email)
}
