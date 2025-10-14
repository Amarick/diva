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
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Inicia a câmera
  const startCamera = async () => {
    if (typeof window === "undefined") return

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      setStream(mediaStream)
      setCameraError(null)
      console.log("[v0] Camera stream obtained successfully", mediaStream)
    } catch (error) {
      console.error("[v0] Erro ao acessar câmera:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      setCameraError(errorMessage)
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
    setCameraError(null)
  }

  // Captura e analisa a imagem
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

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log("[v0] Setting video srcObject", stream)
      videoRef.current.srcObject = stream

      // Wait for metadata to load before playing
      videoRef.current.onloadedmetadata = () => {
        console.log("[v0] Video metadata loaded")
        const playPromise = videoRef.current?.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("[v0] Video playing successfully")
              setStep("camera")
            })
            .catch((err) => {
              console.error("[v0] Autoplay bloqueado:", err)
              setCameraError("Não foi possível iniciar o vídeo automaticamente")
            })
        }
      }
    }
  }, [stream])

  // Limpa a câmera ao desmontar
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="aspect-video bg-secondary rounded-lg overflow-hidden relative min-h-[400px]">
          {/* Estado idle */}
          {step === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
              <Camera className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">Clique abaixo para iniciar a análise facial</p>
              <Button onClick={startCamera} size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Ativar Câmera
              </Button>
              {cameraError && <p className="text-destructive text-sm mt-4 max-w-md">Erro: {cameraError}</p>}
            </div>
          )}

          {/* Câmera */}
          {(step === "camera" || stream) && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ transform: "scaleX(-1)" }}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 border-4 border-primary/50 rounded-lg pointer-events-none z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-primary rounded-full" />
              </div>
            </>
          )}

          {/* Analisando */}
          {step === "analyzing" && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center text-center z-20">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium">Analisando suas características...</p>
              <p className="text-sm text-muted-foreground mt-2">Isso levará apenas alguns segundos</p>
            </div>
          )}

          {/* Concluído */}
          {step === "complete" && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center text-center z-20">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
              <p className="text-lg font-medium">Análise concluída!</p>
              <p className="text-sm text-muted-foreground mt-2">Redirecionando para seus resultados...</p>
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
          <p className="text-sm text-muted-foreground">Resultados em segundos para você começar sua transformação.</p>
        </Card>
      </div>
    </div>
  )
}
