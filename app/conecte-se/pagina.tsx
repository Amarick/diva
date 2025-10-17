"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Crown, Mail, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/cabeçalho"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Login form submitted with email:", email)
    const result = await login(email, password)
    console.log("[v0] Login result:", result)

    if (result.success) {
      toast({
        title: "Bem-vinda!",
        description: "Login realizado com sucesso",
      })
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao fazer login",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Crown className="h-4 w-4" />
                Bem-vinda de volta
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Entrar</h1>
              <p className="text-muted-foreground">Acesse sua conta para continuar sua jornada imperial</p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link href="/recuperar-senha" className="text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link href="/cadastro" className="text-primary hover:underline font-medium">
                    Cadastre-se
                  </Link>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
