// app/colorimetria/ColorimetriaPageComponent.jsx
"use client"

import React from "react"
import { useCart } from "@/lib/cart" // exemplo de hook que precisa do CartProvider
import { Card } from "@/components/ui/card"

export default function ColorimetriaPageComponent() {
  const { items } = useCart() // só funciona dentro do CartProvider

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Colorimetria</h1>
      <Card>
        Você tem {items.length} itens no carrinho
      </Card>
    </div>
  )
}
