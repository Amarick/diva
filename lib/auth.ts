   "use client";

   import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
   import { useRouter } from "next/navigation";

   interface User {
     id: string;
     email: string;
     name: string;
   }

   interface AuthContextType {
     user: User | null;
     login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
     signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
     logout: () => void;
     isLoading: boolean;
   }

   const AuthContext = createContext<AuthContextType | undefined>(undefined);  // Correção aqui

   export function AuthProvider({ children }: { children: ReactNode }) {
     const [user, setUser] = useState<User | null>(null);
     const [isLoading, setIsLoading] = useState(true);
     const router = useRouter();

     useEffect(() => {
       if (typeof window !== "undefined") {  // Adicione essa verificação para evitar erros no servidor
         console.log("[v0] AuthProvider mounted, checking for existing session");

         // Resto do código...
         const usersData = localStorage.getItem("users");
         const users = usersData ? JSON.parse(usersData) : [];

         if (users.length === 0) {
           console.log("[v0] No users found, creating test user");
           const testUser = {
             id: crypto.randomUUID(),
             email: "teste@divaimperial.com",
             password: "123456",
             name: "Usuário Teste",
           };
           localStorage.setItem("users", JSON.stringify([testUser]));
           console.log("[v0] Test user created - Email: teste@divaimperial.com, Senha: 123456");
         }

         const storedUser = localStorage.getItem("user");
         if (storedUser) {
           console.log("[v0] Found stored user:", storedUser);
           setUser(JSON.parse(storedUser));
         } else {
           console.log("[v0] No stored user found");
         }
         setIsLoading(false);
       }
     }, []);

     const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
       // Seu código de login permanece o mesmo, mas adicione a verificação
       if (typeof window === "undefined") {
         return { success: false, error: "Ambiente não suportado" };
       }

       try {
         const usersData = localStorage.getItem("users");
         const users = usersData ? JSON.parse(usersData) : [];

         const found = users.find((u: any) => u.email === email && u.password === password);
         if (found) {
           const userObj: User = { id: found.id, email: found.email, name: found.name };
           setUser(userObj);
           localStorage.setItem("user", JSON.stringify(userObj));
           router.push("/");
           return { success: true };
         } else {
           return { success: false, error: "Email ou senha inválidos" };
         }
       } catch (err) {
         return { success: false, error: "Erro ao processar login" };
       }
     };

     const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
       // Seu código de signup permanece o mesmo, mas adicione a verificação
       if (typeof window === "undefined") {
         return { success: false, error: "Ambiente não suportado" };
       }

       try {
         const usersData = localStorage.getItem("users");
         const users = usersData ? JSON.parse(usersData) : [];

         const exists = users.some((u: any) => u.email === email);
         if (exists) {
           return { success: false, error: "Email já cadastrado" };
         }

         const newUser = {
           id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : String(Date.now()),
           email,
           password,
           name,
         };
         users.push(newUser);
         localStorage.setItem("users", JSON.stringify(users));

         const userObj: User = { id: newUser.id, email: newUser.email, name: newUser.name };
         setUser(userObj);
         localStorage.setItem("user", JSON.stringify(userObj));
         router.push("/");

         return { success: true };
       } catch (err) {
         return { success: false, error: "Erro ao criar usuário" };
       }
     };

     const logout = () => {
       if (typeof window !== "undefined") {
         console.log("[v0] Logging out");
         setUser(null);
         localStorage.removeItem("user");
         router.push("/login");
       }
     };

     return React.createElement(AuthContext.Provider, { value: { user, login, signup, logout, isLoading } }, children);
   }

   export function useAuth() {
     const context = useContext(AuthContext);
     if (context === undefined) {
       throw new Error("useAuth must be used within an AuthProvider");
     }
     return context;
   }

   // As funções checkEmailExists e resetPassword já têm verificações, então estão ok.
   