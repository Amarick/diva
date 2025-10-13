import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Crown, Sparkles, Heart, Shield } from "lucide-react"

export default function SobrePage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
              Sobre Diva Imperial
            </h1>
            <p className="text-lg text-muted-foreground">
              Tecnologia e moda se encontram para revelar sua essência única
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed">
                Diva Imperial nasceu da visão de democratizar a análise de estilo e colorimetria, oferecendo a todas as mulheres acesso a um conhecimento que antes era exclusivo de consultores de imagem. Com tecnologia avançada de reconhecimento facial, ajudamos você a descobrir as cores e estilos que mais realçam sua beleza natural. Além disso, produzimos e vendemos nossas próprias roupas, cuidadosamente desenvolvidas para valorizar cada estilo único. Nossa missão é unir inovação, moda e praticidade, permitindo que cada mulher se sinta confiante e impecável em qualquer ocasião.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Sparkles className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Tecnologia Avançada</h3>
                <p className="text-sm text-muted-foreground">
                  Utilizamos algoritmos de análise facial para identificar com precisão seu tom de pele e
                  características únicas
                </p>
              </Card>

              <Card className="p-6">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Personalização</h3>
                <p className="text-sm text-muted-foreground">
                  Cada análise é única e personalizada, respeitando sua individualidade e características pessoais
                </p>
              </Card>

              <Card className="p-6">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Privacidade</h3>
                <p className="text-sm text-muted-foreground">
                  Suas imagens são processadas localmente e nunca são armazenadas ou compartilhadas
                </p>
              </Card>

              <Card className="p-6">
                <Crown className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Empoderamento</h3>
                <p className="text-sm text-muted-foreground">
                  Acreditamos que conhecer seu estilo é uma forma de autoconhecimento e empoderamento feminino
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-background">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Pronta para começar?</h2>
                <p className="text-muted-foreground mb-6">Descubra agora as cores e estilos que fazem você brilhar</p>
                <Button asChild size="lg">
                  <Link href="/reconhecimento">
                    <Crown className="mr-2 h-5 w-5" />
                    Iniciar Análise
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
