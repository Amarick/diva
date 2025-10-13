"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function FacialRecognition() {
  const [step, setStep] = useState<"idle" | "camera" | "analyzing" | "complete">("idle")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Inicia a câmera
  const startCamera = async () => {
    if (typeof window === "undefined") return

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play().catch((err) => {
          console.warn("Autoplay bloqueado:", err)
        })
      }

      setStep("camera")
    } catch (error) {
      console.error("Erro ao acessar câmera:", error)
      toast({
        title: "Erro ao acessar câmera",
        description: "Por favor, permita o acesso à câmera para continuar.",
        variant: "destructive",
      })
    }
  }

  // Para a câmera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setStep("idle")
  }

  // Captura e analisa
  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    setStep("analyzing")

    // Simulação de IA
    setTimeout(() => {
      const results = {
        skinTone: "warm",
        colorPalette: ["#8B4513", "#D2691E", "#CD853F", "#DEB887"],
        recommendedStyles: ["Vintage", "Coquette", "Old Money"],
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("divaImperialAnalysis", JSON.stringify(results))
      setStep("complete")

      setTimeout(() => {
        stopCamera()
        router.push("/resultado")
      }, 2000)
    }, 3000)
  }

  // Limpa a câmera ao desmontar
  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="aspect-video bg-secondary rounded-lg overflow-hidden relative">
          {/* Estado idle */}
          {step === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Camera className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">
                Clique abaixo para iniciar a análise facial
              </p>
              <Button onClick={startCamera} size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Ativar Câmera
              </Button>
            </div>
          )}

          {/* Câmera */}
          {step === "camera" && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-primary/50 rounded-lg pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-primary rounded-full" />
              </div>
            </>
          )}

          {/* Analisando */}
          {step === "analyzing" && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center text-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium">Analisando suas características...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Isso levará apenas alguns segundos
              </p>
            </div>
          )}

          {/* Concluído */}
          {step === "complete" && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
              <p className="text-lg font-medium">Análise concluída!</p>
              <p className="text-sm text-muted-foreground mt-2">
                Redirecionando para seus resultados...
              </p>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Botões */}
        {step === "camera" && (
          <div className="mt-6 flex gap-4 justify-center">
            <Button onClick={captureAndAnalyze} size="lg">
              Capturar e Analisar
            </Button>
            <Button onClick={stopCamera} variant="outline" size="lg">
              Cancelar
            </Button>
          </div>
        )}
      </Card>

      {/* Cards informativos */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Privacidade</h3>
          <p className="text-sm text-muted-foreground">
            Suas imagens não são armazenadas e são processadas localmente.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Precisão</h3>
          <p className="text-sm text-muted-foreground">
            Tecnologia avançada de análise facial para resultados precisos.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Rapidez</h3>
          <p className="text-sm text-muted-foreground">
            Resultados em segundos para você começar sua transformação.
          </p>
        </Card>
      </div>
    </div>
  )
}
