import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Palette, Sparkles, Crown } from "lucide-react";

export default function HomePage() {
  const carouselImages = [
    { src: "/foto1.jpeg", alt: "Estilo Formal" },
    { src: "/foto2.jpeg", alt: "Estilo Streetwear" },
    { src: "/foto3.jpeg", alt: "Estilo Old Money" },
    { src: "/foto4.jpeg", alt: "Carrossel" },
    { src: "/foto5.jpeg", alt: "Carrossel" },
    { src: "/foto6.jpeg", alt: "Carrossel" },
    { src: "/foto7.jpeg", alt: "Carrossel" },
    { src: "/foto8.jpeg", alt: "Carrossel" },
    { src: "/foto9.jpeg", alt: "Carrossel" },
    { src: "/foto10.jpeg", alt: "Carrossel" },
    { src: "/foto11.jpeg", alt: "Carrossel" },
    { src: "/foto16.jpeg", alt: "Carrossel" },
    { src: "/foto18.jpg", alt: "Carrossel" },

  ];

  // Repetimos as imagens para o carrossel contínuo
  const repeatedImages = [...carouselImages, ...carouselImages];

  return (
    <main className="min-h-screen pt-28">
      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[url('/abstract-elegant-pattern.png')] opacity-5" />

        <div className="container mx-auto px-4 pt-8">
          <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden mb-8">
            <div className="flex gap-4 animate-scroll-left">
              {repeatedImages.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] md:w-[380px] h-[350px] md:h-[450px] relative rounded-xl overflow-hidden shadow-xl"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20 md:pb-28 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Crown className="h-4 w-4" />
              Descubra sua essência imperial
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6 text-balance">
              Seu estilo único revelado pela tecnologia
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Análise facial inteligente que identifica sua colorimetria perfeita e os estilos que mais combinam com você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/reconhecimento">
                  <Camera className="mr-2 h-5 w-5" />
                  Iniciar Análise
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-transparent">
                <Link href="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para descobrir seu estilo imperial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-3">1. Reconhecimento</h3>
              <p className="text-muted-foreground">
                Nossa tecnologia analisa suas características faciais e tom de pele em segundos
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-3">2. Colorimetria</h3>
              <p className="text-muted-foreground">
                Descubra quais cores realçam sua beleza natural e harmonizam com seu tom de pele
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-3">3. Seu Estilo</h3>
              <p className="text-muted-foreground">
                Receba recomendações personalizadas de estilos que combinam perfeitamente com você
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-6">
              Pronta para se descobrir?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Comece sua jornada imperial agora e revele a diva que existe em você
            </p>
            <Button asChild size="lg" className="text-lg">
              <Link href="/reconhecimento">
                <Crown className="mr-2 h-5 w-5" />
                Começar Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
