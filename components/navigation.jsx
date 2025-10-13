"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, LogIn } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Início" },
  { href: "/reconhecimento", label: "Reconhecimento" },
  { href: "/colorimetria", label: "Colorimetria" },
  { href: "/estilos", label: "Estilos" },
  { href: "/contato", label: "Contato" },
  { href: "/feedback", label: "Feedback" },
  { href: "/sobre", label: "Sobre" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Diva Imperial" width={400} height={130} className="h-24 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-white/90",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" variant="outline" className="ml-2 bg-transparent">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-primary/20">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-1",
                    pathname === item.href ? "text-primary" : "text-white/90",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white/90 hover:text-primary px-2 py-1 flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
