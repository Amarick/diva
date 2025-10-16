"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AnalyzeSkinToneResult {
  skinTone: string
  colorPalette: string[]
  recommendedStyles: string[]
}

function analyzeSkinTone(imageData: ImageData): AnalyzeSkinToneResult {
  const data = imageData.data
  let r = 0,
    g = 0,
    b = 0
  let count = 0

  const centerX = imageData.width / 2
  const centerY = imageData.height / 2
  const sampleSize = 200 // Aumentado de 150 para 200 para melhor precisão

  for (let y = centerY - sampleSize; y < centerY + sampleSize; y++) {
    for (let x = centerX - sampleSize; x < centerX + sampleSize; x++) {
      const i = (Math.floor(y) * imageData.width + Math.floor(x)) * 4
      if (i >= 0 && i < data.length) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
        count++
      }
    }
  }

  r = Math.floor(r / count)
  g = Math.floor(g / count)
  b = Math.floor(b / count)

  console.log("[v0] RGB médio detectado:", { r, g, b })

  const brightness = (r + g + b) / 3
  const warmth = r - b // Valores positivos = quente, negativos = frio
  const isWarm = warmth > 0

  console.log("[v0] Análise detalhada:", { brightness, warmth, isWarm })

  let skinTone: string
  let colorPalette: string[]
  let recommendedStyles: string[]

  if (brightness > 190) {
    // Pele muito clara
    skinTone = "muito clara"
    if (isWarm) {
      colorPalette = ["#FFE4E1", "#FFC0CB", "#FFB6C1", "#FF69B4", "#C71585"]
      recommendedStyles = ["Coquette", "Romântico", "Old Money"]
    } else {
      colorPalette = ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#BA55D3", "#9370DB"]
      recommendedStyles = ["Vintage", "Gótico", "Casual"]
    }
  } else if (brightness > 150) {
    // Pele clara
    skinTone = "clara"
    if (isWarm) {
      colorPalette = ["#FFDAB9", "#FFE4B5", "#F0E68C", "#DAA520", "#B8860B"]
      recommendedStyles = ["Vintage", "Old Money", "Casual"]
    } else {
      colorPalette = ["#B0E0E6", "#87CEEB", "#4682B4", "#5F9EA0", "#2F4F4F"]
      recommendedStyles = ["Streetwear", "Casual", "Coquette"]
    }
  } else if (brightness > 110) {
    // Pele média
    skinTone = "média"
    if (isWarm) {
      colorPalette = ["#CD853F", "#D2691E", "#8B4513", "#A0522D", "#654321"]
      recommendedStyles = ["Vintage", "Coquette", "Old Money"]
    } else {
      colorPalette = ["#708090", "#778899", "#696969", "#2F4F4F", "#000080"]
      recommendedStyles = ["Streetwear", "Gótico", "Casual"]
    }
  } else if (brightness > 70) {
    // Pele morena
    skinTone = "morena"
    if (isWarm) {
      colorPalette = ["#8B4513", "#A0522D", "#D2691E", "#FF8C00", "#FFD700"]
      recommendedStyles = ["Vintage", "Streetwear", "Casual"]
    } else {
      colorPalette = ["#4B0082", "#483D8B", "#6A5ACD", "#7B68EE", "#9370DB"]
      recommendedStyles = ["Gótico", "Old Money", "Streetwear"]
    }
  } else {
    // Pele escura
    skinTone = "escura"
    if (isWarm) {
      colorPalette = ["#8B0000", "#DC143C", "#FF4500", "#FF6347", "#FFD700"]
      recommendedStyles = ["Streetwear", "Vintage", "Casual"]
    } else {
      colorPalette = ["#191970", "#000080", "#00008B", "#0000CD", "#4169E1"]
      recommendedStyles = ["Gótico", "Old Money", "Streetwear"]
    }
  }

  console.log("[v0] Resultado final da análise:", { skinTone, brightness, warmth, isWarm, colorPalette })

  return { skinTone, colorPalette, recommendedStyles }
}

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
      console.log("[v0] Solicitando acesso à câmera...")
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
      console.log("[v0] Stream da câmera obtido com sucesso", mediaStream)
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

    // Espelha horizontalmente para corresponder ao vídeo
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
    ctx.restore()

    setStep("analyzing")

    // Analisa a imagem capturada
    setTimeout(() => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const analysis = analyzeSkinTone(imageData)

      const results = {
        ...analysis,
        timestamp: new Date().toISOString(),
        debug: {
          captureTime: new Date().toLocaleString("pt-BR"),
          videoSize: `${canvas.width}x${canvas.height}`,
          analyzed: true,
        },
      }

      console.log("[v0] Resultados da análise:", results)

      try {
        localStorage.setItem("divaImperialAnalysis", JSON.stringify(results))
      } catch (error) {
        console.error("[v0] Erro ao salvar no localStorage:", error)
      }

      setStep("complete")

      setTimeout(() => {
        stopCamera()
        router.push("/resultado")
      }, 2000)
    }, 3000)
  }

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log("[v0] Configurando srcObject do vídeo", stream)
      videoRef.current.srcObject = stream

      // Aguarda o carregamento dos metadados antes de reproduzir
      videoRef.current.onloadedmetadata = () => {
        console.log("[v0] Metadados do vídeo carregados")
        const playPromise = videoRef.current?.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("[v0] Vídeo reproduzindo com sucesso")
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
                className="w-full h-full object-cover absolute inset-0 z-[5]"
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
