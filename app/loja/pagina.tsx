"use client"

import { useState } from "react"
import { Header } from "@/components/cabeçalho"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products, categories } from "@/lib/produtos"
import { ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/carrinho-contexto"
import { toast } from "sonner"

export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const { addItem } = useCart()

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((p) => p.category === selectedCategory)

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Nossa Coleção</h1>
            <p className="text-muted-foreground text-lg">
              Peças exclusivas selecionadas para realçar seu estilo imperial
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/loja/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button onClick={() => handleAddToCart(product)} className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
