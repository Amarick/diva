// app/cadastro/page.jsx
"use client"

import dynamic from "next/dynamic"

// Carrega apenas no cliente para evitar erro de useCart durante build
const CadastroPage = dynamic(() => import("./CadastroPageComponent"), { ssr: false })

export default CadastroPage
