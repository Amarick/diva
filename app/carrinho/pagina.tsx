"use client"

import { Header } from "@/components/cabeçalho"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/carrinho-contexto"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground mb-8">Adicione produtos incríveis da nossa coleção ao seu carrinho</p>
              <Link href="/loja">
                <Button size="lg">
                  Ir para a Loja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card key={`${item.id}-${item.size}-${item.color}-${index}`} className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                          {item.size && <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>}
                          {item.color && <p className="text-sm text-muted-foreground">Cor: {item.color}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">R$ {(item.price * item.quantity).toFixed(2)}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">R$ {item.price.toFixed(2)} cada</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})
                    </span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>{total >= 299 ? "Grátis" : "Calculado no checkout"}</span>
                  </div>
                  {total >= 299 && <p className="text-sm text-green-600">✓ Você ganhou frete grátis!</p>}
                  {total < 299 && (
                    <p className="text-sm text-muted-foreground">
                      Faltam R$ {(299 - total).toFixed(2)} para frete grátis
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full mb-3" onClick={() => router.push("/checkout")}>
                  Finalizar Compra
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Link href="/loja">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Continuar Comprando
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground text-center">Parcelamento em até 6x sem juros</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
