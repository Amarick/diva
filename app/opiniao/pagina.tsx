"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/cabeçalho"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Feedback enviado!",
      description: "Obrigada por compartilhar sua opinião conosco",
    })

    setIsLoading(false)
    ;(e.target as HTMLFormElement).reset()
    setRating(0)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquare className="h-4 w-4" />
              Sua Opinião Importa
            </div>
            <h1 className="text-5xl font-bold mb-4">Feedback</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conte-nos sobre sua experiência com nossos serviços
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" placeholder="Seu nome" required disabled={isLoading} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required disabled={isLoading} />
              </div>

              <div className="space-y-2">
                <Label>Avaliação</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                      disabled={isLoading}
                    >
                      <Star
                        className={`h-8 w-8 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Conte-nos sobre sua experiência..."
                  rows={6}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Feedback"}
              </Button>
            </form>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Depoimentos</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Maria Silva",
                  text: "A análise de colorimetria mudou completamente minha forma de me vestir. Agora sei exatamente quais cores me favorecem!",
                  rating: 5,
                },
                {
                  name: "Ana Costa",
                  text: "Serviço excepcional! A consultoria de estilo me ajudou a encontrar minha identidade visual.",
                  rating: 5,
                },
                {
                  name: "Julia Santos",
                  text: "Profissionais incríveis e atenciosas. Recomendo muito!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-2">{testimonial.text}</p>
                  <p className="font-medium text-sm">— {testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
