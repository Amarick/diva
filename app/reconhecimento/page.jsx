import { FacialRecognition } from "@/components/facial-recognition"

export default function ReconhecimentoPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Reconhecimento Facial
            </h1>
            <p className="text-lg text-muted-foreground">
              Permita o acesso à câmera para iniciar sua análise personalizada
            </p>
          </div>

          <FacialRecognition />
        </div>
      </div>
    </main>
  )
}
