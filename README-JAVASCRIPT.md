# Diva Imperial - Versão JavaScript Puro

Site de análise de estilo e colorimetria usando reconhecimento facial, desenvolvido com HTML, CSS e JavaScript puro.

## 📁 Estrutura de Arquivos

\`\`\`
diva-imperial/
├── index.html              # Página inicial
├── reconhecimento.html     # Página de reconhecimento facial
├── resultado.html          # Página de resultados da análise
├── estilos.html           # Página de estilos de moda
├── colorimetria.html      # Página de colorimetria
├── feedback.html          # Página de feedback
├── sobre.html             # Página sobre o projeto
├── styles.css             # Estilos CSS
├── script.js              # JavaScript principal (navegação)
├── camera.js              # Funcionalidade da câmera
├── resultado.js           # Exibição de resultados
├── estilos.js             # Dados e exibição de estilos
├── colorimetria.js        # Dados e exibição de colorimetria
├── feedback.js            # Formulário de feedback
└── public/
    └── logo.png           # Logo do site
\`\`\`

## 🚀 Como Usar

### Opção 1: Abrir Diretamente no Navegador

1. Baixe todos os arquivos para uma pasta no seu computador
2. Certifique-se de que a estrutura de pastas está correta
3. Abra o arquivo `index.html` no seu navegador (Chrome, Firefox, Edge, etc.)
4. Pronto! O site está funcionando

### Opção 2: Usar um Servidor Local (Recomendado)

Para melhor funcionamento da câmera, use um servidor local:

**Com Python:**
\`\`\`bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
\`\`\`

**Com Node.js:**
\`\`\`bash
npx http-server
\`\`\`

**Com PHP:**
\`\`\`bash
php -S localhost:8000
\`\`\`

Depois acesse: `http://localhost:8000`

## 📱 Funcionalidades

### 1. Reconhecimento Facial
- Acessa a câmera do dispositivo
- Captura imagem do usuário
- Simula análise de características faciais
- Gera resultados personalizados

### 2. Análise de Colorimetria
- 4 estações: Primavera, Verão, Outono, Inverno
- Paletas de cores personalizadas
- Recomendações de cores ideais

### 3. Estilos de Moda
- 6 estilos diferentes: Vintage, Streetwear, Old Money, Gótico, Coquette, Casual
- Descrições detalhadas de cada estilo
- Lojas recomendadas para cada estilo

### 4. Sistema de Feedback
- Formulário com avaliação por estrelas
- Armazenamento local dos feedbacks

## 🎨 Personalização

### Cores
Edite as variáveis CSS no arquivo `styles.css`:

\`\`\`css
:root {
    --primary: #FF0080;        /* Rosa principal */
    --primary-dark: #CC0066;   /* Rosa escuro */
    --background: #000000;     /* Fundo preto */
    --foreground: #FFFFFF;     /* Texto branco */
    --card: #1A1A1A;          /* Fundo dos cards */
}
\`\`\`

### Estilos de Moda
Edite o array `stylesData` no arquivo `estilos.js` para adicionar ou modificar estilos.

### Colorimetria
Edite o array `seasonsData` no arquivo `colorimetria.js` para modificar as estações e paletas.

## 🔒 Privacidade

- Todas as imagens são processadas localmente no navegador
- Nenhuma imagem é enviada para servidores externos
- Os dados são armazenados apenas no localStorage do navegador
- O usuário tem controle total sobre seus dados

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Navegadores móveis (iOS/Android)

## 🎓 Para Professores e Alunos

Este projeto é ideal para ensino de:
- HTML5 semântico
- CSS3 moderno (Flexbox, Grid)
- JavaScript vanilla (sem frameworks)
- API de câmera (getUserMedia)
- LocalStorage
- Manipulação do DOM
- Eventos e formulários

## 🐛 Solução de Problemas

**Câmera não funciona:**
- Certifique-se de permitir acesso à câmera quando solicitado
- Use HTTPS ou localhost (necessário para getUserMedia)
- Verifique se outro aplicativo não está usando a câmera

**Estilos não carregam:**
- Verifique se o arquivo `styles.css` está na mesma pasta
- Limpe o cache do navegador (Ctrl+F5)

**JavaScript não funciona:**
- Abra o Console do navegador (F12) para ver erros
- Verifique se todos os arquivos .js estão na pasta correta

## 📄 Licença

Projeto educacional - livre para uso e modificação.
