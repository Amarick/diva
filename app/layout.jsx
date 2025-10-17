// app/layout.tsx ou layout.jsx
import { CartProvider } from "@/lib/cart" // precisa existir
import { AuthProvider } from "@/lib/auth"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navigation items={navItems} />
            {children}
            <Toaster />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
