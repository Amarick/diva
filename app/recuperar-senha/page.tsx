"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Crown, Mail, Lock, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { checkEmailExists, resetPassword } from "@/lib/auth"

export default function RecuperarSenhaPage() {
  const [step, setStep] = useState<"email" | "reset">("email")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const exists = await checkEmailExists(email)

    if (exists) {
      toast({
        title: "E-mail encontrado",
        description: "Agora você pode redefinir sua senha",
      })
      setStep("reset")
    } else {
      toast({
        title: "Erro",
        description: "E-mail não encontrado",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const result = await resetPassword(email, newPassword)

    if (result.success) {
      toast({
        title: "Sucesso!",
        description: result.message,
      })
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } else {
      toast({
        title: "Erro",
        description: result.message,
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Crown className="h-4 w-4" />
              Recuperação de senha
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {step === "email" ? "Esqueceu a senha?" : "Nova senha"}
            </h1>
            <p className="text-muted-foreground">
              {step === "email" ? "Digite seu e-mail para recuperar o acesso" : "Digite sua nova senha"}
            </p>
          </div>

          <Card className="p-8">
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
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

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Verificando..." : "Continuar"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para login
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Redefinindo..." : "Redefinir senha"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </main>
  )
}
