"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function FacialRecognition() {
  const [step, setStep] = useState("idle") // idle | camera | analyzing | complete
  const [stream, setStream] = useState(null) // <- sem tipagem
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const router = useRouter()
  const { toast } = useToast()

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
      setStep("camera")
    } catch (error) {
      toast({
        title: "Erro ao acessar câmera",
        description: "Por favor, permita o acesso à câmera para continuar.",
        variant: "destructive",
      })
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setStep("idle")
  }

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

    // Simula análise da IA
    setTimeout(() => {
      setStep("complete")

      const results = {
        skinTone: "warm",
        colorPalette: ["#8B4513", "#D2691E", "#CD853F", "#DEB887"],
        recommendedStyles: ["Vintage", "Coquette", "Old Money"],
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("divaImperialAnalysis", JSON.stringify(results))

      setTimeout(() => {
        stopCamera()
        router.push("/resultado")
      }, 2000)
    }, 3000)
  }

  // Para limpar a câmera caso o componente seja desmontado
  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="aspect-video bg-secondary rounded-lg overflow-hidden relative">
          {step === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">Clique no botão abaixo para iniciar</p>
              <Button onClick={startCamera} size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Ativar Câmera
              </Button>
            </div>
          )}

          {step === "camera" && (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-4 border-primary/50 rounded-lg pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-primary rounded-full" />
              </div>
            </>
          )}

          {step === "analyzing" && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium">Analisando suas características...</p>
              <p className="text-sm text-muted-foreground mt-2">Isso levará apenas alguns segundos</p>
            </div>
          )}

          {step === "complete" && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
              <p className="text-lg font-medium">Análise concluída!</p>
              <p className="text-sm text-muted-foreground mt-2">Redirecionando para seus resultados...</p>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

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

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Privacidade</h3>
          <p className="text-sm text-muted-foreground">Suas imagens não são armazenadas e são processadas localmente</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Precisão</h3>
          <p className="text-sm text-muted-foreground">
            Tecnologia avançada de análise facial para resultados precisos
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Instantâneo</h3>
          <p className="text-sm text-muted-foreground">Resultados em segundos para você começar sua transformação</p>
        </Card>
      </div>
    </div>
  )
}
