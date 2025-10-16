"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Palette, Sparkles, Info, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

const styleDescriptions = {
  Vintage: "Clássico e atemporal, com peças retrô e elegantes",
  Coquette: "Romântico e delicado, com laços, rendas e tons suaves",
  "Old Money": "Sofisticado e discreto, com peças de qualidade premium",
  Gótico: "Dramático e misterioso, com tons escuros e detalhes únicos",
  Streetwear: "Urbano e descolado, com peças confortáveis e modernas",
  Casual: "Confortável e versátil para o dia a dia",
  Romântico: "Feminino e delicado, com tecidos fluidos e detalhes suaves",
}

const skinToneDescriptions = {
  "muito clara": "Pele clara com tons rosados ou neutros. Harmoniza bem com cores suaves e pastéis.",
  clara: "Pele clara com subtom quente ou frio. Versátil para diversas paletas de cores.",
  média: "Pele com tom médio, equilibrado. Combina com cores terrosas e vibrantes.",
  morena: "Pele morena com subtom quente. Realçada por cores ricas e douradas.",
  escura: "Pele escura com tons profundos. Valorizada por cores intensas e contrastantes.",
}

/**
 * @typedef {Object} AnalysisResults
 * @property {string} skinTone
 * @property {string[]} colorPalette
 * @property {string[]} recommendedStyles
 * @property {string} timestamp
 * @property {{ captureTime: string, videoSize: string, analyzed: boolean }=} debug
 */

export default function ResultadoPage() {
  const [mounted, setMounted] = useState(false)
  const [results, setResults] = useState<AnalysisResults | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    const stored = localStorage.getItem("divaImperialAnalysis")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setResults(parsed)
        console.log("[v0] Resultados carregados:", parsed)
      } catch (error) {
        console.error("[v0] Erro ao parsear resultados:", error)
        router.push("/reconhecimento")
      }
    } else {
      router.push("/reconhecimento")
    }
  }, [mounted, router])

  if (!mounted || !results) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <p>Carregando resultados...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              Análise Completa
            </Badge>
            <h1 className="font-sans text-4xl md:text-5xl font-bold mb-4">Seus Resultados Imperiais</h1>
            <p className="text-lg text-muted-foreground">Descubra as cores e estilos perfeitos para você</p>
            {results.debug?.captureTime && (
              <p className="text-sm text-muted-foreground mt-2">Análise realizada em: {results.debug.captureTime}</p>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Como funciona a análise?</p>
                  <p className="text-sm text-muted-foreground">
                    Nossa tecnologia analisa os tons da sua pele em tempo real através da câmera, identificando seu
                    subtom (quente ou frio) e luminosidade. Cada análise é única e personalizada para você!
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    💡 Dica: Faça a análise em diferentes iluminações para ver como as cores se adaptam!
                  </p>
                </div>
              </div>
            </Card>

            {/* Colorimetria */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Sua Colorimetria</h2>
                  <p className="text-muted-foreground">
                    Tom de pele: <span className="font-medium text-foreground capitalize">{results.skinTone}</span>
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {skinToneDescriptions[results.skinTone] ||
                    "Tom de pele único e especial."}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Estas cores foram selecionadas especialmente para harmonizar com seu tom de pele:
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                  {results.colorPalette.map((color, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="w-24 h-24 rounded-lg border-2 border-border shadow-lg hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs font-mono font-medium">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Estilos Recomendados */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Estilos Recomendados</h2>
                  <p className="text-muted-foreground">Baseado em suas características únicas</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {results.recommendedStyles.map((style) => (
                  <Card key={style} className="p-6 bg-card hover:bg-accent/5 transition-colors border-2">
                    <h3 className="font-bold text-lg mb-2">{style}</h3>
                    <p className="text-sm text-muted-foreground">
                      {styleDescriptions[style] || "Estilo único e personalizado"}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" variant="outline" onClick={() => router.push("/reconhecimento")}>
                <RefreshCw className="mr-2 h-5 w-5" />
                Fazer Nova Análise
              </Button>
              <Button asChild size="lg">
                <Link href="/estilos">Ver Todos os Estilos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
