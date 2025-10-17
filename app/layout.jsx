// app/layout.tsx ou layout.jsx
import { CartProvider } from "@/lib/cart" // ⚠️ precisa existir
import { AuthProvider } from "@/lib/auth"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

// Defina navItems localmente
const navItems = [
  { href: "/", label: "Início" },
  { href: "/reconhecimento", label: "Reconhecimento" },
  { href: "/colorimetria", label: "Colorimetria" },
  { href: "/estilos", label: "Estilos" },
  { href: "/feedback", label: "Feedback" },
  { href: "/sobre", label: "Sobre" },
]

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
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
