"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"


export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Crown className="h-4 w-4" />
              Área Imperial
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
              Bem-vinda, {user.name}!
            </h1>
            <p className="text-muted-foreground">Você está logada como {user.email}</p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
                <p className="text-muted-foreground">
                  Esta é sua área protegida. Apenas usuários autenticados podem acessar esta página.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-6 bg-primary/5">
                  <h3 className="font-semibold mb-2">Perfil</h3>
                  <p className="text-sm text-muted-foreground">Nome: {user.name}</p>
                  <p className="text-sm text-muted-foreground">E-mail: {user.email}</p>
                </Card>

                <Card className="p-6 bg-primary/5">
                  <h3 className="font-semibold mb-2">Status</h3>
                  <p className="text-sm text-muted-foreground">Conta ativa</p>
                  <p className="text-sm text-muted-foreground">Autenticação funcionando ✓</p>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Button onClick={logout} variant="outline" size="lg">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
