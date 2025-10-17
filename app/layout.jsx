import GeistSans from "geist/font/sans"
import GeistMono from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const navItems = [
  { href: "/", label: "Início" },
  { href: "/reconhecimento", label: "Reconhecimento" },
  { href: "/colorimetria", label: "Colorimetria" },
  { href: "/estilos", label: "Estilos" },
  { href: "/feedback", label: "Feedback" },
  { href: "/sobre", label: "Sobre" },
]

// ✅ Mantém o metadata aqui, já que o layout não é client-side
export const metadata = {
  title: "Diva Imperial - Análise de Estilo e Colorimetria",
  description:
    "Descubra seu estilo único com reconhecimento facial e análise personalizada de colorimetria.",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="light">
      <body className="light">
        <AuthProvider>
          <Navigation items={navItems} />
          <main>{children}</main>
          <Toaster />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
