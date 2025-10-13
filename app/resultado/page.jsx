"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Palette, Sparkles, Download, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

const styleDescriptions = {
  Vintage: "Clássico e atemporal, com peças retrô e elegantes",
  Coquette: "Romântico e delicado, com laços, rendas e tons suaves",
  "Old Money": "Sofisticado e discreto, com peças de qualidade premium",
  Gótico: "Dramático e misterioso, com tons escuros e detalhes únicos",
  Streetwear: "Urbano e descolado, com peças confortáveis e modernas",
  Casual: "Confortável e versátil para o dia a dia",
}

export default function ResultadoPage() {
  const [results, setResults] = useState(null)
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
    <main className="min-h-screen pt-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              Análise Completa
            </Badge>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
              Seus Resultados Imperiais
            </h1>
            <p className="text-lg text-muted-foreground">Descubra as cores e estilos perfeitos para você</p>
          </div>

          <div className="space-y-6">
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

              <div className="space-y-4">
                <p className="text-muted-foreground">Estas cores harmonizam perfeitamente com seu tom de pele:</p>
                <div className="flex gap-4 flex-wrap">
                  {results.colorPalette.map((color, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="w-20 h-20 rounded-lg border-2 border-border shadow-md"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs font-mono">{color}</span>
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
                  <Card key={style} className="p-6 bg-card hover:bg-accent/5 transition-colors">
                    <h3 className="font-bold text-lg mb-2">{style}</h3>
                    <p className="text-sm text-muted-foreground">{styleDescriptions[style]}</p>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-5 w-5" />
                Baixar Resultados
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                Compartilhar
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
