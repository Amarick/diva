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

function generatePalette(skinTone) {
  const palettes = {
    "muito clara": ["#FFE0E0", "#FFD1DC", "#FFC0CB", "#FFB6C1", "#FFDAB9"],
    clara: ["#FFFACD", "#FAFAD2", "#FFE4B5", "#FFD700", "#FFEFD5"],
    média: ["#F0E68C", "#D2B48C", "#DEB887", "#C68642", "#A0522D"],
    morena: ["#D2691E", "#8B4513", "#A0522D", "#CD853F", "#F4A460"],
    escura: ["#800000", "#8B0000", "#A52A2A", "#B22222", "#DC143C"],
  }
  const palette = palettes[skinTone] || ["#ccc", "#aaa", "#888", "#666"]
  return palette.sort(() => Math.random() - 0.5)
}

export default function ResultadoPage() {
  const [mounted, setMounted] = useState(false)
  const [results, setResults] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    const stored = localStorage.getItem("divaImperialAnalysis")
    if (!stored) {
      router.push("/reconhecimento")
      return
    }

    try {
      const parsed = JSON.parse(stored)
      parsed.colorPalette = parsed.colorPalette || generatePalette(parsed.skinTone)
      setResults(parsed)
    } catch (error) {
      console.error("Erro ao parsear resultados:", error)
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
            <Badge className="mb-4" variant="secondary">Análise Completa</Badge>
            <h1 className="font-sans text-4xl md:text-5xl font-bold mb-4">Seus Resultados Imperiais</h1>
            <p className="text-lg text-muted-foreground">Descubra as cores e estilos perfeitos para você</p>
            {results.debug?.captureTime && (
              <p className="text-sm text-muted-foreground mt-2">Análise realizada em: {results.debug.captureTime}</p>
            )}
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Sua Colorimetria</h2>
            <p className="text-muted-foreground">
              Tom de pele: <span className="font-medium capitalize">{results.skinTone}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {skinToneDescriptions[results.skinTone] || "Tom de pele único e especial."}
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              {results.colorPalette?.map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-lg border-2 shadow-lg" style={{ backgroundColor: color }} />
                  <span className="text-xs font-mono font-medium">{color}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 mt-6">
            <h2 className="text-2xl font-bold mb-4">Estilos Recomendados</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {results.recommendedStyles?.map((style) => (
                <Card key={style} className="p-6 bg-card hover:bg-accent/5 border-2">
                  <h3 className="font-bold text-lg mb-2">{style}</h3>
                  <p className="text-sm text-muted-foreground">{styleDescriptions[style] || "Estilo único e personalizado"}</p>
                </Card>
              ))}
            </div>
          </Card>

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
    </main>
  )
}
