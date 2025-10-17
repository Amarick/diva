"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown, User, Mail, Calendar, Palette, Sparkles } from "lucide-react"
import { Header } from "@/components/cabeçalho"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Você precisa estar logado para acessar esta página</p>
            <Link href="/login">
              <Button>Fazer Login</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Crown className="h-4 w-4" />
                Meu Perfil
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vinda, {user.name}!</h1>
              <p className="text-muted-foreground">Gerencie suas informações e acompanhe suas análises</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Informações Pessoais</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Membro desde hoje</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Minhas Análises</h2>
                </div>
                <p className="text-muted-foreground mb-4">Você ainda não tem análises realizadas.</p>
                <Link href="/colorimetria">
                  <Button variant="outline" className="w-full bg-transparent">
                    Fazer Análise de Colorimetria
                  </Button>
                </Link>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link href="/colorimetria">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <Palette className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Colorimetria</h3>
                  <p className="text-sm text-muted-foreground">Descubra sua paleta de cores</p>
                </Card>
              </Link>

              <Link href="/estilos">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <Sparkles className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Análise de Estilo</h3>
                  <p className="text-sm text-muted-foreground">Encontre seu estilo único</p>
                </Card>
              </Link>

              <Link href="/reconhecimento">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <Crown className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Reconhecimento</h3>
                  <p className="text-sm text-muted-foreground">Análise facial completa</p>
                </Card>
              </Link>
            </div>

            <Card className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Precisa de ajuda?</h2>
              <p className="text-muted-foreground mb-4">Entre em contato conosco ou envie seu feedback</p>
              <div className="flex gap-3 justify-center">
                <Link href="/feedback">
                  <Button variant="outline">Enviar Feedback</Button>
                </Link>
                <Button variant="destructive" onClick={logout}>
                  Sair da Conta
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
