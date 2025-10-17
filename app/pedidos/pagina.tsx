"use client"

import { Header } from "@/components/cabeçalho"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { useOrders } from "@/lib/pedidos-contexto"
import { Package, ShoppingBag, MapPin, CreditCard, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PedidosPage() {
  const { user } = useAuth()
  const { getOrdersByUser } = useOrders()
  const router = useRouter()

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Faça login para ver seus pedidos</h1>
            <p className="text-muted-foreground mb-8">Você precisa estar logado para acessar o histórico de pedidos</p>
            <Button onClick={() => router.push("/login")}>Fazer Login</Button>
          </div>
        </main>
      </>
    )
  }

  const userOrders = getOrdersByUser(user.id)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const },
      processing: { label: "Processando", variant: "default" as const },
      shipped: { label: "Enviado", variant: "default" as const },
      delivered: { label: "Entregue", variant: "default" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      "credit-card": "Cartão de Crédito",
      pix: "PIX",
      boleto: "Boleto Bancário",
    }
    return methods[method] || method
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Meus Pedidos</h1>
            <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
          </div>

          {userOrders.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Nenhum pedido encontrado</h2>
              <p className="text-muted-foreground mb-6">Você ainda não realizou nenhuma compra</p>
              <Link href="/loja">
                <Button>Ir para a Loja</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-6">
              {userOrders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">Pedido #{order.id.slice(0, 8)}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(order.createdAt).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total</p>
                      <p className="text-2xl font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Shipping Address */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Endereço de Entrega</h4>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{order.shippingAddress.fullName}</p>
                        <p>
                          {order.shippingAddress.street}, {order.shippingAddress.number}
                        </p>
                        {order.shippingAddress.complement && <p>{order.shippingAddress.complement}</p>}
                        <p>
                          {order.shippingAddress.neighborhood} - {order.shippingAddress.city}/
                          {order.shippingAddress.state}
                        </p>
                        <p>CEP: {order.shippingAddress.zipCode}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Forma de Pagamento</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{getPaymentMethodLabel(order.paymentMethod)}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">Itens do Pedido</h4>
                    </div>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded bg-background">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium leading-tight">{item.name}</p>
                            <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                              {item.size && <span>Tamanho: {item.size}</span>}
                              {item.color && <span>Cor: {item.color}</span>}
                              <span>Qtd: {item.quantity}</span>
                            </div>
                            <p className="text-sm font-semibold text-primary mt-1">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
