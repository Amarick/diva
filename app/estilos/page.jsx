import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const styles = [
  {
    name: "Vintage",
    description: "Clássico e atemporal, inspirado nas décadas passadas com peças retrô e elegantes",
    image: "public/foto13.jpeg",
    colors: ["#8B4513", "#D2691E", "#CD853F"],
    characteristics: ["Retrô", "Elegante", "Atemporal"],
    stores: [
      { name: "Renner", url: "https://www.lojasrenner.com.br" },
      { name: "C&A", url: "https://www.cea.com.br" },
      { name: "Riachuelo", url: "https://www.riachuelo.com.br" },
    ],
  },
  {
    name: "Streetwear",
    description: "Urbano e descolado, com peças confortáveis, oversized e referências da cultura de rua",
    image: "/foto17.jpeg",
    colors: ["#000000", "#FFFFFF", "#FF6B6B"],
    characteristics: ["Urbano", "Confortável", "Moderno"],
    stores: [
      { name: "Hering", url: "https://www.hering.com.br" },
      { name: "Reserva", url: "https://www.usereserva.com" },
      { name: "Zara", url: "https://www.zara.com/br" },
    ],
  },
  {
    name: "Old Money",
    description: "Sofisticação discreta com peças de qualidade premium, cortes clássicos e elegância atemporal",
    image: "/foto13.jpeg",
    colors: ["#2C3E50", "#ECF0F1", "#95A5A6"],
    characteristics: ["Sofisticado", "Discreto", "Premium"],
    stores: [
      { name: "Animale", url: "https://www.animale.com.br" },
      { name: "Farm", url: "https://www.farmrio.com.br" },
      { name: "Shoulder", url: "https://www.shoulder.com.br" },
    ],
  },
  {
    name: "Gótico",
    description: "Dramático e misterioso, com tons escuros, detalhes únicos e uma estética alternativa",
    image: "/foto12.jpeg",
    colors: ["#000000", "#8B0000", "#4B0082"],
    characteristics: ["Dramático", "Misterioso", "Alternativo"],
    stores: [
      { name: "Shein", url: "https://www.shein.com.br" },
      { name: "Renner", url: "https://www.lojasrenner.com.br" },
      { name: "C&A", url: "https://www.cea.com.br" },
    ],
  },
  {
    name: "Coquette",
    description: "Romântico e delicado, com laços, rendas, tons pastéis e uma feminilidade suave",
    image: "/foto14.jpeg",
    colors: ["#FFB6C1", "#FFF0F5", "#E6E6FA"],
    characteristics: ["Romântico", "Delicado", "Feminino"],
    stores: [
      { name: "Marisa", url: "https://www.marisa.com.br" },
      { name: "Riachuelo", url: "https://www.riachuelo.com.br" },
      { name: "Amaro", url: "https://www.amaro.com" },
    ],
  },
  {
    name: "Casual",
    description: "Confortável e versátil para o dia a dia, com peças práticas e descomplicadas",
    image: "/foto15.jpeg",
    colors: ["#4A90E2", "#F5F5F5", "#7ED321"],
    characteristics: ["Confortável", "Versátil", "Prático"],
    stores: [
      { name: "Hering", url: "https://www.hering.com.br" },
      { name: "Marisa", url: "https://www.marisa.com.br" },
      { name: "Renner", url: "https://www.lojasrenner.com.br" },
    ],
  },
]

export default function EstilosPage() {
  return (
    <main className="min-h-screen pt-28">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Descubra seu estilo perfeito
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold mb-6">
              Estilos Disponíveis
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore todos os estilos que nossa análise pode identificar para você. Cada estilo é único e reflete
              diferentes aspectos da sua personalidade.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {styles.map((style) => (
              <Card key={style.name} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={style.image || "/placeholder.svg"}
                    alt={style.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white font-[family-name:var(--font-playfair)]">
                    {style.name}
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{style.description}</p>

                  <div className="flex gap-2 flex-wrap">
                    {style.characteristics.map((char) => (
                      <Badge key={char} variant="secondary" className="px-3 py-1">
                        {char}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-3">Paleta de cores:</p>
                    <div className="flex gap-3">
                      {style.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-14 h-14 rounded-xl border-2 border-border shadow-md hover:scale-110 transition-transform cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-3">Lojas recomendadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {style.stores.map((store) => (
                        <Link
                          key={store.name}
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                        >
                          {store.name}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
