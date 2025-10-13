import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const colorimetryTypes = [
  {
    name: "Primavera",
    description: "Tom de pele quente com subtom dourado ou pêssego",
    colors: ["#FFD700", "#FF6347", "#FFA07A", "#98FB98", "#87CEEB"],
    characteristics: ["Quente", "Luminoso", "Vibrante"],
    bestColors: "Cores quentes e claras como coral, pêssego, dourado e verde-claro",
    avoidColors: "Cores frias e escuras como preto puro, cinza carvão e azul marinho",
  },
  {
    name: "Verão",
    description: "Tom de pele frio com subtom rosado ou azulado",
    colors: ["#E6E6FA", "#B0C4DE", "#FFB6C1", "#DDA0DD", "#F0E68C"],
    characteristics: ["Frio", "Suave", "Delicado"],
    bestColors: "Cores frias e suaves como lavanda, rosa claro, azul bebê e cinza suave",
    avoidColors: "Cores quentes e vibrantes como laranja, dourado e marrom quente",
  },
  {
    name: "Outono",
    description: "Tom de pele quente com subtom dourado ou oliváceo",
    colors: ["#8B4513", "#D2691E", "#CD853F", "#556B2F", "#B8860B"],
    characteristics: ["Quente", "Terroso", "Rico"],
    bestColors: "Cores quentes e terrosas como caramelo, terracota, verde-oliva e mostarda",
    avoidColors: "Cores frias e vibrantes como rosa pink, azul elétrico e preto puro",
  },
  {
    name: "Inverno",
    description: "Tom de pele frio com alto contraste",
    colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#FF1493"],
    characteristics: ["Frio", "Intenso", "Contrastante"],
    bestColors: "Cores frias e intensas como preto, branco puro, vermelho intenso e azul royal",
    avoidColors: "Cores quentes e suaves como bege, caramelo e laranja suave",
  },
]

export default function ColorimetriaPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
              Guia de Colorimetria
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entenda os diferentes tipos de colorimetria e descubra qual combina com você
            </p>
          </div>

          <div className="space-y-8">
            {colorimetryTypes.map((type) => (
              <Card key={type.name} className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{type.name}</h2>
                    <p className="text-lg text-muted-foreground">{type.description}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {type.characteristics.map((char) => (
                      <Badge key={char} variant="secondary" className="text-sm">
                        {char}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3">Paleta de cores:</p>
                    <div className="flex gap-3 flex-wrap">
                      {type.colors.map((color, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div
                            className="w-16 h-16 rounded-lg border-2 border-border shadow-md"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-mono">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="font-semibold text-sm mb-2 text-primary">✓ Cores ideais:</p>
                      <p className="text-sm text-muted-foreground">{type.bestColors}</p>
                    </div>
                    <div className="p-4 bg-destructive/5 rounded-lg">
                      <p className="font-semibold text-sm mb-2 text-destructive">✗ Evite:</p>
                      <p className="text-sm text-muted-foreground">{type.avoidColors}</p>
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
