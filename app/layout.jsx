import GeistSans from "geist/font/sans"
import GeistMono from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth"
import { CartProvider } from "@/lib/carrinho-contexto" // ✅ necessário se usar useCart

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

export const metadata = {
  title: "Diva Imperial - Análise de Estilo e Colorimetria",
  description:
    "Descubra seu estilo único com reconhecimento facial e análise personalizada de colorimetria.",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="light">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Navigation items={navItems} />
            <main>{children}</main>
            <Toaster />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
