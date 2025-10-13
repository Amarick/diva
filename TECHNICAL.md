# 📚 Documentação Técnica - Diva Imperial

Esta documentação é voltada para desenvolvedores que desejam entender a arquitetura técnica e contribuir com o projeto.

---

## 🏗 Arquitetura

### Visão Geral

O Diva Imperial é uma aplicação **Next.js 15** com **App Router** que utiliza **React Server Components (RSC)** e **Client Components** de forma estratégica.

\`\`\`
┌─────────────────────────────────────────┐
│           Next.js App Router            │
├─────────────────────────────────────────┤
│  Server Components (RSC)                │
│  - Layout principal                     │
│  - Páginas estáticas                    │
│  - Navegação                            │
├─────────────────────────────────────────┤
│  Client Components                      │
│  - Reconhecimento facial                │
│  - Formulários interativos              │
│  - Animações e transições               │
├─────────────────────────────────────────┤
│  Browser APIs                           │
│  - MediaDevices (câmera)                │
│  - Canvas (processamento)               │
│  - LocalStorage (persistência)          │
└─────────────────────────────────────────┘
\`\`\`

---

## 🧩 Componentes Principais

### Navigation Component (`components/navigation.tsx`)

**Tipo**: Server Component

Componente de navegação responsivo com:
- Logo grande (120px altura)
- Menu desktop com links
- Menu mobile com drawer (Sheet)
- Fundo preto para combinar com o logo

\`\`\`tsx
// Estrutura
<nav className="bg-black">
  <div className="container">
    <Link href="/">
      <Image src="/logo.png" alt="Diva Imperial" />
    </Link>
    
    {/* Desktop Menu */}
    <div className="hidden md:flex">
      <NavigationLinks />
    </div>
    
    {/* Mobile Menu */}
    <Sheet>
      <SheetTrigger>Menu</SheetTrigger>
      <SheetContent>
        <NavigationLinks />
      </SheetContent>
    </Sheet>
  </div>
</nav>
\`\`\`

### Facial Recognition Component (`components/facial-recognition.tsx`)

**Tipo**: Client Component (`'use client'`)

Componente complexo que gerencia:
- Acesso à câmera via `navigator.mediaDevices.getUserMedia()`
- Stream de vídeo em elemento `<video>`
- Detecção facial simulada
- Captura de foto via Canvas API
- Estados de loading e erro

\`\`\`tsx
// Fluxo de funcionamento
1. Usuário clica em "Iniciar Câmera"
2. Solicita permissão de câmera
3. Inicia stream de vídeo
4. Simula detecção facial (círculo verde)
5. Usuário clica em "Capturar Foto"
6. Canvas captura frame do vídeo
7. Converte para base64
8. Salva no LocalStorage
9. Redireciona para página de resultados
\`\`\`

**Estados gerenciados**:
\`\`\`tsx
const [stream, setStream] = useState<MediaStream | null>(null)
const [isCameraActive, setIsCameraActive] = useState(false)
const [isDetecting, setIsDetecting] = useState(false)
const [error, setError] = useState<string>("")
\`\`\`

---

## 🎨 Sistema de Design

### Tokens de Design (globals.css)

\`\`\`css
@theme inline {
  /* Cores */
  --primary: 328 100% 50%;           /* #FF0080 - Rosa Pink */
  --primary-foreground: 0 0% 100%;   /* Branco */
  --background: 0 0% 0%;             /* Preto */
  --foreground: 0 0% 100%;           /* Branco */
  --muted: 0 0% 15%;                 /* Cinza escuro */
  --muted-foreground: 0 0% 70%;      /* Cinza claro */
  
  /* Tipografia */
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
  
  /* Espaçamento */
  --radius: 0.5rem;                  /* Border radius padrão */
}
\`\`\`

### Hierarquia Tipográfica

\`\`\`tsx
// Títulos principais
<h1 className="font-serif text-5xl md:text-7xl">

// Subtítulos
<h2 className="font-serif text-3xl md:text-5xl">

// Títulos de seção
<h3 className="font-serif text-2xl md:text-3xl">

// Corpo de texto
<p className="text-base md:text-lg leading-relaxed">
\`\`\`

### Sistema de Cores

**Primária (Rosa Pink)**:
- Botões principais
- Destaques e CTAs
- Ícones importantes
- Hover states

**Background (Preto)**:
- Fundo principal
- Header/Navigation
- Cards e seções

**Foreground (Branco)**:
- Texto principal
- Ícones
- Bordas

---

## 📊 Fluxo de Dados

### Análise Facial - Fluxo Completo

\`\`\`
┌──────────────┐
│   Usuária    │
│  clica em    │
│   "Iniciar"  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  FacialRecognition.tsx   │
│  - getUserMedia()        │
│  - Inicia stream         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   Detecção Facial        │
│   (simulada com timer)   │
│   - 2 segundos           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   Captura de Foto        │
│   - Canvas.drawImage()   │
│   - toDataURL()          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   Análise (simulada)     │
│   - Algoritmo mock       │
│   - 3 segundos           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   LocalStorage           │
│   - capturedImage        │
│   - analysisResult       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   Página de Resultado    │
│   - Lê do LocalStorage   │
│   - Exibe resultados     │
└──────────────────────────┘
\`\`\`

### Estrutura de Dados - LocalStorage

\`\`\`typescript
// Imagem capturada
localStorage.setItem('capturedImage', base64String)

// Resultado da análise
interface AnalysisResult {
  colorimetry: 'Primavera' | 'Verão' | 'Outono' | 'Inverno'
  styles: string[]  // ['Vintage', 'Old Money']
  confidence: number  // 0-100
  timestamp: string
}

localStorage.setItem('analysisResult', JSON.stringify(result))
\`\`\`

---

## 🔧 APIs e Integrações

### MediaDevices API

\`\`\`typescript
// Solicitar acesso à câmera
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user'  // Câmera frontal
  }
})

// Parar stream
stream.getTracks().forEach(track => track.stop())
\`\`\`

### Canvas API

\`\`\`typescript
// Capturar frame do vídeo
const canvas = document.createElement('canvas')
canvas.width = video.videoWidth
canvas.height = video.videoHeight

const ctx = canvas.getContext('2d')
ctx?.drawImage(video, 0, 0)

// Converter para base64
const imageData = canvas.toDataURL('image/jpeg', 0.8)
\`\`\`

### LocalStorage API

\`\`\`typescript
// Salvar dados
localStorage.setItem('key', JSON.stringify(data))

// Recuperar dados
const data = JSON.parse(localStorage.getItem('key') || '{}')

// Limpar dados
localStorage.removeItem('key')
localStorage.clear()  // Limpa tudo
\`\`\`

---

## 🎯 Algoritmo de Análise (Mock)

### Colorimetria

\`\`\`typescript
function analyzeColorimetry(imageData: string): Season {
  // Simulação - Em produção, usar IA real
  const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno']
  const randomIndex = Math.floor(Math.random() * seasons.length)
  return seasons[randomIndex]
}
\`\`\`

### Análise de Estilo

\`\`\`typescript
function analyzeStyle(imageData: string): string[] {
  // Simulação - Em produção, usar IA real
  const allStyles = ['Vintage', 'Streetwear', 'Old Money', 'Gótico', 'Coquette', 'Casual']
  
  // Retorna 2-3 estilos aleatórios
  const numStyles = Math.floor(Math.random() * 2) + 2
  const selectedStyles: string[] = []
  
  while (selectedStyles.length < numStyles) {
    const randomStyle = allStyles[Math.floor(Math.random() * allStyles.length)]
    if (!selectedStyles.includes(randomStyle)) {
      selectedStyles.push(randomStyle)
    }
  }
  
  return selectedStyles
}
\`\`\`

---

## 🚀 Performance

### Otimizações Implementadas

1. **Image Optimization**
   \`\`\`tsx
   import Image from 'next/image'
   
   <Image
     src="/logo.png"
     width={400}
     height={120}
     alt="Diva Imperial"
     priority  // Carrega logo imediatamente
   />
   \`\`\`

2. **Code Splitting**
   - Componentes client-side são automaticamente code-split
   - Cada página é um bundle separado

3. **Server Components**
   - Páginas estáticas renderizadas no servidor
   - Reduz JavaScript enviado ao cliente

4. **Lazy Loading**
   \`\`\`tsx
   // Componentes pesados podem ser lazy loaded
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Spinner />
   })
   \`\`\`

### Métricas de Performance

**Targets**:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1

---

## 🧪 Testing (Futuro)

### Estrutura de Testes Recomendada

\`\`\`
tests/
├── unit/
│   ├── components/
│   │   ├── navigation.test.tsx
│   │   └── facial-recognition.test.tsx
│   └── utils/
│       └── analysis.test.ts
├── integration/
│   ├── facial-recognition-flow.test.tsx
│   └── feedback-form.test.tsx
└── e2e/
    ├── user-journey.spec.ts
    └── camera-access.spec.ts
\`\`\`

### Ferramentas Recomendadas

- **Jest** + **React Testing Library** - Testes unitários
- **Playwright** - Testes E2E
- **MSW** - Mock de APIs

---

## 🔐 Segurança

### Práticas Implementadas

1. **Content Security Policy (CSP)**
   \`\`\`tsx
   // next.config.js
   headers: [
     {
       key: 'Content-Security-Policy',
       value: "default-src 'self'; img-src 'self' data: blob:;"
     }
   ]
   \`\`\`

2. **Sanitização de Inputs**
   \`\`\`tsx
   // Todos os inputs de formulário são validados
   const sanitizedInput = input.trim().slice(0, 500)
   \`\`\`

3. **Permissões de Câmera**
   - Solicitadas apenas quando necessário
   - Usuária tem controle total

---

## 📦 Deploy

### Vercel (Recomendado)

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
\`\`\`

### Variáveis de Ambiente

Não há variáveis de ambiente necessárias atualmente. Para futuras integrações:

\`\`\`env
# .env.local
NEXT_PUBLIC_API_URL=https://api.divaimperial.com
NEXT_PUBLIC_ANALYTICS_ID=xxx
\`\`\`

---

## 🤝 Contribuindo

### Workflow de Desenvolvimento

1. **Fork o repositório**
2. **Crie uma branch**: `git checkout -b feature/nova-funcionalidade`
3. **Faça commits**: `git commit -m 'Adiciona nova funcionalidade'`
4. **Push**: `git push origin feature/nova-funcionalidade`
5. **Abra um Pull Request**

### Padrões de Código

- **ESLint** para linting
- **Prettier** para formatação
- **TypeScript** strict mode
- **Conventional Commits** para mensagens

### Checklist de PR

- [ ] Código segue os padrões do projeto
- [ ] Componentes são responsivos
- [ ] Acessibilidade verificada (ARIA, semântica)
- [ ] Performance não foi degradada
- [ ] Documentação atualizada

---

## 📞 Suporte Técnico

Para questões técnicas:
- Abra uma issue no GitHub
- Consulte a documentação do Next.js
- Entre em contato com a equipe de desenvolvimento

---

**Última atualização**: Janeiro 2025
