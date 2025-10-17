"use client"

import { useAuth } from "@/lib/auth"
import { useOrders } from "@/lib/pedidos-contexto"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, User, Mail, Calendar, Palette, Sparkles, Package, ShoppingBag } from "lucide-react"
import { Header } from "@/components/cabeçalho"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { getOrdersByUser } = useOrders()

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

  const userOrders = getOrdersByUser(user.id)
  const recentOrders = userOrders.slice(0, 3)

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

            {userOrders.length > 0 && (
              <Card className="p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Pedidos Recentes</h2>
                  </div>
                  <Link href="/pedidos">
                    <Button variant="ghost" size="sm">
                      Ver Todos
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Package className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">Pedido #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("pt-BR")} • {order.items.length}{" "}
                            {order.items.length === 1 ? "item" : "itens"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                        <Badge variant={order.status === "delivered" ? "default" : "secondary"} className="mt-1">
                          {order.status === "processing" && "Processando"}
                          {order.status === "shipped" && "Enviado"}
                          {order.status === "delivered" && "Entregue"}
                          {order.status === "pending" && "Pendente"}
                          {order.status === "cancelled" && "Cancelado"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Link href="/loja">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <ShoppingBag className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Loja</h3>
                  <p className="text-sm text-muted-foreground">Explore nossa coleção</p>
                </Card>
              </Link>

              <Link href="/colorimetria">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <Palette className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Colorimetria</h3>
                  <p className="text-sm text-muted-foreground">Descubra sua paleta</p>
                </Card>
              </Link>

              <Link href="/estilos">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <Sparkles className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Estilos</h3>
                  <p className="text-sm text-muted-foreground">Encontre seu estilo</p>
                </Card>
              </Link>

              <Link href="/reconhecimento">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <Crown className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Reconhecimento</h3>
                  <p className="text-sm text-muted-foreground">Análise completa</p>
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
