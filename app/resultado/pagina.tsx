"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Palette, Sparkles, ShoppingBag } from "lucide-react"

export default function ResultadoPage() {
  const [results, setResults] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("divaImperialAnalysis")
    if (stored) {
      setResults(JSON.parse(stored))
    } else {
      router.push("/reconhecimento")
    }
  }, [router])

  if (!results) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <p>Carregando resultados...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-sans text-4xl md:text-5xl font-bold mb-4">Seus Resultados</h1>
            <p className="text-lg text-muted-foreground">Análise completa da sua colorimetria pessoal</p>
          </div>

          <div className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Tom de Pele</h2>
              </div>
              <p className="text-lg mb-4">
                Seu tom de pele é: <span className="font-semibold capitalize">{results.skinTone}</span>
              </p>
              <div className="flex gap-3">
                {results.colorPalette.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-lg border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Estilos Recomendados</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {results.recommendedStyles.map((style: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                    {style}
                  </span>
                ))}
              </div>
            </Card>

            <div className="flex gap-4 justify-center pt-6">
              <Button size="lg" onClick={() => router.push("/produtos")}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ver Produtos Recomendados
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/reconhecimento")}>
                Fazer Nova Análise
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
