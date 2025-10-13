# 👑 Diva Imperial

**Diva Imperial** é uma plataforma web inovadora voltada ao público feminino que utiliza reconhecimento facial e inteligência artificial para análise de estilo pessoal e colorimetria. O site ajuda mulheres a descobrirem quais cores e estilos de roupas mais combinam com elas.

![Diva Imperial Logo](public/logo.png)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Páginas do Site](#páginas-do-site)
- [Personalização](#personalização)
- [Privacidade e Segurança](#privacidade-e-segurança)
- [Suporte](#suporte)

---

## 🎯 Sobre o Projeto

Diva Imperial é uma solução completa para análise de estilo pessoal que combina tecnologia de reconhecimento facial com consultoria de moda. O objetivo é empoderar mulheres a descobrirem seu estilo único através de:

- **Análise de Colorimetria**: Identifica qual paleta de cores (Primavera, Verão, Outono, Inverno) mais combina com o tom de pele da usuária
- **Análise de Estilo**: Sugere estilos de moda (Vintage, Streetwear, Old Money, Gótico, Coquette, Casual) baseados nas características faciais e preferências
- **Recomendações de Lojas**: Indica lojas brasileiras onde encontrar roupas de cada estilo

---

## ✨ Funcionalidades

### 🎥 Reconhecimento Facial
- Acesso à câmera do dispositivo (computador ou celular)
- Interface intuitiva com overlay de detecção facial
- Captura de foto para análise
- Processamento local (imagens não são enviadas para servidores)

### 🌈 Análise de Colorimetria
- 4 estações de cores: Primavera, Verão, Outono, Inverno
- Paletas de cores personalizadas para cada estação
- Recomendações de cores ideais para roupas, maquiagem e acessórios
- Explicação detalhada de cada paleta

### 👗 Análise de Estilos
- 6 estilos principais: Vintage, Streetwear, Old Money, Gótico, Coquette, Casual
- Descrição completa de cada estilo
- Características e peças-chave
- Recomendações de lojas brasileiras para cada estilo

### 💬 Feedback
- Formulário completo para envio de sugestões
- Campos para nome, email e mensagem
- Sistema de avaliação por estrelas
- Interface amigável e responsiva

---

## 🛠 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS v4** - Framework CSS utilitário

### UI Components
- **shadcn/ui** - Componentes React reutilizáveis
- **Lucide React** - Ícones modernos
- **Radix UI** - Componentes acessíveis

### APIs do Navegador
- **MediaDevices API** - Acesso à câmera
- **Canvas API** - Processamento de imagens
- **LocalStorage** - Armazenamento local de resultados

### Fontes
- **Playfair Display** - Fonte serifada elegante para títulos
- **Inter** - Fonte sans-serif moderna para corpo de texto

---

## 📁 Estrutura do Projeto

\`\`\`
diva-imperial/
├── app/
│   ├── page.tsx                 # Página inicial (Home)
│   ├── reconhecimento/
│   │   └── page.tsx            # Página de reconhecimento facial
│   ├── resultado/
│   │   └── page.tsx            # Página de resultados da análise
│   ├── estilos/
│   │   └── page.tsx            # Página de estilos de moda
│   ├── colorimetria/
│   │   └── page.tsx            # Página de colorimetria
│   ├── feedback/
│   │   └── page.tsx            # Página de feedback
│   ├── sobre/
│   │   └── page.tsx            # Página sobre o projeto
│   ├── layout.tsx               # Layout principal
│   └── globals.css              # Estilos globais
├── components/
│   ├── navigation.tsx           # Componente de navegação
│   ├── facial-recognition.tsx   # Componente de reconhecimento facial
│   └── ui/                      # Componentes shadcn/ui
├── public/
│   └── logo.png                 # Logo do Diva Imperial
└── README.md                    # Este arquivo
\`\`\`

---

## 🚀 Como Usar

### Para Usuárias do Site

1. **Acesse a Página Inicial**
   - Leia sobre o projeto e suas funcionalidades
   - Clique em "Iniciar Análise" para começar

2. **Reconhecimento Facial**
   - Permita o acesso à câmera quando solicitado
   - Posicione seu rosto no centro da tela
   - Aguarde a detecção facial (círculo verde)
   - Clique em "Capturar Foto" quando estiver pronta

3. **Aguarde a Análise**
   - O sistema analisará sua foto (processamento local)
   - Aguarde alguns segundos enquanto a IA processa

4. **Veja Seus Resultados**
   - Descubra sua estação de colorimetria
   - Conheça os estilos que mais combinam com você
   - Explore as paletas de cores recomendadas
   - Veja sugestões de lojas para comprar

5. **Explore Mais**
   - Visite a página de Estilos para conhecer todos os estilos
   - Acesse Colorimetria para entender as 4 estações
   - Envie feedback sobre sua experiência

### Para Desenvolvedores

1. **Instalação**
   \`\`\`bash
   # Clone o repositório ou baixe o ZIP
   # Instale as dependências
   npm install
   # ou
   pnpm install
   \`\`\`

2. **Desenvolvimento**
   \`\`\`bash
   # Inicie o servidor de desenvolvimento
   npm run dev
   # ou
   pnpm dev
   \`\`\`

3. **Build para Produção**
   \`\`\`bash
   # Crie a build otimizada
   npm run build
   # Inicie o servidor de produção
   npm start
   \`\`\`

---

## 📄 Páginas do Site

### 🏠 Home (`/`)
Página inicial com apresentação do projeto, hero section com call-to-action e informações sobre as funcionalidades.

### 📸 Reconhecimento (`/reconhecimento`)
Interface de captura facial com acesso à câmera, overlay de detecção e botão de captura.

### 📊 Resultado (`/resultado`)
Exibe os resultados da análise incluindo:
- Foto capturada
- Estação de colorimetria identificada
- Paleta de cores recomendada
- Estilos sugeridos
- Botões para explorar mais

### 👗 Estilos (`/estilos`)
Catálogo completo dos 6 estilos de moda com:
- Descrição detalhada
- Características principais
- Peças-chave
- Lojas recomendadas (Renner, C&A, Riachuelo, Zara, etc.)

### 🎨 Colorimetria (`/colorimetria`)
Explicação das 4 estações de cores:
- **Primavera**: Tons quentes e claros
- **Verão**: Tons frios e suaves
- **Outono**: Tons quentes e profundos
- **Inverno**: Tons frios e intensos

### 💬 Feedback (`/feedback`)
Formulário para usuárias enviarem:
- Avaliação (1-5 estrelas)
- Nome e email
- Mensagem/sugestão

### ℹ️ Sobre (`/sobre`)
Informações sobre o projeto, missão e equipe.

---

## 🎨 Personalização

### Cores da Marca

As cores principais estão definidas no `app/globals.css`:

\`\`\`css
--primary: 328 100% 50%;        /* Rosa Pink #FF0080 */
--background: 0 0% 0%;          /* Preto */
--foreground: 0 0% 100%;        /* Branco */
\`\`\`

Para alterar as cores, edite os valores HSL no arquivo `globals.css`.

### Fontes

As fontes são configuradas no `app/layout.tsx`:

\`\`\`tsx
const playfair = Playfair_Display({ ... })  // Títulos
const inter = Inter({ ... })                 // Corpo de texto
\`\`\`

Para usar outras fontes do Google Fonts, importe-as e atualize as variáveis CSS.

### Estilos de Moda

Para adicionar novos estilos, edite o array `styles` em `app/estilos/page.tsx`:

\`\`\`tsx
const styles = [
  {
    name: "Novo Estilo",
    description: "Descrição do estilo...",
    characteristics: ["Característica 1", "Característica 2"],
    keyPieces: ["Peça 1", "Peça 2"],
    stores: ["Loja 1", "Loja 2"]
  }
]
\`\`\`

### Paletas de Colorimetria

Para modificar as paletas, edite o array `seasons` em `app/colorimetria/page.tsx`:

\`\`\`tsx
const seasons = [
  {
    name: "Nova Estação",
    description: "Descrição...",
    colors: ["#HEX1", "#HEX2", "#HEX3"],
    characteristics: ["Característica 1"]
  }
]
\`\`\`

---

## 🔒 Privacidade e Segurança

### Processamento Local
- **Todas as imagens são processadas localmente** no navegador da usuária
- **Nenhuma foto é enviada para servidores externos**
- **Não há armazenamento de imagens em nuvem**

### Dados Armazenados
- Os resultados da análise são salvos apenas no **LocalStorage** do navegador
- A usuária pode limpar os dados a qualquer momento limpando o cache do navegador
- Não coletamos dados pessoais além do que é fornecido voluntariamente no formulário de feedback

### Permissões
- O site solicita acesso à câmera apenas quando a usuária clica em "Iniciar Análise"
- A permissão pode ser revogada a qualquer momento nas configurações do navegador

---

## 🎯 Roadmap Futuro

Funcionalidades planejadas para futuras versões:

- [ ] Integração com IA real para análise mais precisa
- [ ] Sistema de login e perfil de usuária
- [ ] Histórico de análises anteriores
- [ ] Compartilhamento de resultados nas redes sociais
- [ ] Recomendações personalizadas de produtos
- [ ] Blog com dicas de moda e estilo
- [ ] Versão mobile nativa (iOS/Android)
- [ ] Integração com e-commerce parceiros

---

## 📞 Suporte

### Problemas Comuns

**A câmera não funciona**
- Verifique se você permitiu o acesso à câmera no navegador
- Teste em outro navegador (Chrome, Firefox, Safari)
- Certifique-se de que nenhum outro aplicativo está usando a câmera

**O site não carrega**
- Limpe o cache do navegador
- Verifique sua conexão com a internet
- Tente acessar em modo anônimo/privado

**Os resultados não aparecem**
- Verifique se o JavaScript está habilitado
- Limpe o LocalStorage e tente novamente
- Atualize a página

### Contato

Para dúvidas, sugestões ou problemas:
- Use o formulário de Feedback no site
- Entre em contato através das redes sociais

---

## 📜 Licença

Este projeto foi desenvolvido para fins educacionais e comerciais. Todos os direitos reservados © 2025 Diva Imperial.

---

## 🙏 Agradecimentos

- **shadcn/ui** pelos componentes React de alta qualidade
- **Vercel** pela plataforma de hospedagem
- **Next.js** pelo framework incrível
- Todas as usuárias que contribuem com feedback

---

**Desenvolvido com 💖 para empoderar mulheres através da moda e tecnologia**

👑 **Diva Imperial** - Descubra seu estilo único!
#   d i v a _ i m p e r i a l  
 