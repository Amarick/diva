import { Header } from "@/components/cabeçalho"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ColorimetriaPage() {
  const seasons = [
    {
      name: "Primavera",
      description: "Cores quentes e claras que iluminam",
      colors: ["#FFD700", "#FF6B6B", "#98D8C8", "#F7DC6F"],
    },
    {
      name: "Verão",
      description: "Cores frias e suaves que harmonizam",
      colors: ["#B4A7D6", "#87CEEB", "#FFB6C1", "#E6E6FA"],
    },
    {
      name: "Outono",
      description: "Cores quentes e profundas que aquecem",
      colors: ["#D2691E", "#8B4513", "#CD853F", "#A0522D"],
    },
    {
      name: "Inverno",
      description: "Cores frias e intensas que contrastam",
      colors: ["#000080", "#8B008B", "#DC143C", "#FFFFFF"],
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Palette className="h-4 w-4" />
              Colorimetria Pessoal
            </div>
            <h1 className="text-5xl font-bold mb-4">Descubra Sua Paleta de Cores</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A colorimetria analisa seu tom de pele, olhos e cabelo para identificar as cores que mais te favorecem
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {seasons.map((season) => (
              <Card key={season.name} className="p-6">
                <h3 className="text-2xl font-bold mb-2">{season.name}</h3>
                <p className="text-muted-foreground mb-4">{season.description}</p>
                <div className="flex gap-2">
                  {season.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-lg border-2 border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Benefícios da Análise de Colorimetria:</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Realça sua beleza natural",
                "Facilita escolhas de roupas e maquiagem",
                "Economiza tempo e dinheiro em compras",
                "Aumenta sua autoconfiança",
                "Cria harmonia visual",
                "Identifica cores que iluminam seu rosto",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center">
            <Link href="/cadastro">
              <Button size="lg">Fazer Análise de Colorimetria</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
