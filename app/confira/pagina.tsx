"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/cabeçalho"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/carrinho-contexto"
import { useAuth } from "@/lib/auth"
import { useOrders } from "@/lib/pedidos-contexto"
import { CreditCard, Barcode, Package, Lock } from "lucide-react"
import { toast } from "sonner"
import type { ShippingAddress } from "@/lib/pedidos-contexto"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingData, setShippingData] = useState<ShippingAddress>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const shippingCost = total >= 299 ? 0 : 29.9
  const finalTotal = total + shippingCost

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Faça login para continuar</h1>
            <p className="text-muted-foreground mb-8">Você precisa estar logado para finalizar sua compra</p>
            <Button onClick={() => router.push("/login")}>Fazer Login</Button>
          </div>
        </main>
      </>
    )
  }

  if (items.length === 0) {
    router.push("/carrinho")
    return null
  }

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Validate required fields
    const requiredFields: (keyof ShippingAddress)[] = [
      "fullName",
      "email",
      "phone",
      "zipCode",
      "street",
      "number",
      "neighborhood",
      "city",
      "state",
    ]

    for (const field of requiredFields) {
      if (!shippingData[field]) {
        toast.error(`Por favor, preencha o campo ${field}`)
        setIsProcessing(false)
        return
      }
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    addOrder({
      userId: user.id,
      items: items,
      shippingAddress: shippingData,
      paymentMethod: paymentMethod,
      total: finalTotal,
      status: "processing",
    })

    // Clear cart
    clearCart()

    toast.success("Pedido realizado com sucesso!")
    router.push("/pedidos")
    setIsProcessing(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Informações de Entrega</h2>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Nome Completo *</Label>
                        <Input
                          id="fullName"
                          value={shippingData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={shippingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          value={shippingData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="00000-000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="street">Endereço *</Label>
                      <Input
                        id="street"
                        value={shippingData.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={shippingData.number}
                          onChange={(e) => handleInputChange("number", e.target.value)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={shippingData.complement}
                          onChange={(e) => handleInputChange("complement", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={shippingData.neighborhood}
                          onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={shippingData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="SP"
                          maxLength={2}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">Forma de Pagamento</h2>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Cartão de Crédito</p>
                          <p className="text-sm text-muted-foreground">Parcelamento em até 6x sem juros</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Barcode className="h-4 w-4" />
                        <div>
                          <p className="font-medium">PIX</p>
                          <p className="text-sm text-muted-foreground">Aprovação imediata</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Barcode className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Boleto Bancário</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex gap-3">
                        <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-tight line-clamp-2">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 pt-6 border-t">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Frete</span>
                      <span>{shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">R$ {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? "Processando..." : "Finalizar Pedido"}
                  </Button>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Pagamento 100% seguro</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
