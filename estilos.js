// Styles data and rendering
const stylesData = [
  {
    name: "Vintage",
    icon: "🌹",
    description:
      "Inspirado nas décadas passadas, o estilo vintage traz elegância atemporal com peças clássicas e românticas.",
    features: [
      "Vestidos midi e saias rodadas",
      "Estampas florais e poás",
      "Cores suaves e pastéis",
      "Acessórios retrô",
    ],
    stores: ["Renner", "C&A", "Riachuelo", "Marisa", "Lojas Americanas"],
  },
  {
    name: "Streetwear",
    icon: "👟",
    description:
      "Urbano e descolado, o streetwear combina conforto com atitude através de peças oversized e tênis estilosos.",
    features: [
      "Moletons e hoodies oversized",
      "Tênis chunky e sneakers",
      "Calças cargo e jeans largos",
      "Bonés e acessórios urbanos",
    ],
    stores: ["Nike", "Adidas", "Zara", "Forever 21", "Hering"],
  },
  {
    name: "Old Money",
    icon: "💎",
    description:
      "Sofisticação discreta com peças de qualidade, o estilo old money transmite elegância e classe sem ostentação.",
    features: ["Alfaiataria impecável", "Cores neutras e sóbrias", "Tecidos nobres", "Acessórios minimalistas"],
    stores: ["Animale", "Farm", "Shoulder", "Amaro", "Reserva"],
  },
  {
    name: "Gótico",
    icon: "🦇",
    description:
      "Dramático e misterioso, o estilo gótico expressa individualidade através de preto, rendas e elementos dark.",
    features: ["Predominância de preto", "Rendas e tecidos texturizados", "Acessórios em metal", "Maquiagem marcante"],
    stores: ["Renner", "C&A", "Riachuelo", "Lojas online especializadas"],
  },
  {
    name: "Coquette",
    icon: "🎀",
    description: "Feminino e delicado, o estilo coquette celebra a feminilidade com laços, babados e tons suaves.",
    features: ["Laços e babados", "Cores pastel e rosa", "Peças delicadas", "Detalhes românticos"],
    stores: ["Zara", "Forever 21", "Renner", "C&A", "Marisa"],
  },
  {
    name: "Casual",
    icon: "👕",
    description:
      "Confortável e versátil, o estilo casual é perfeito para o dia a dia com peças práticas e descomplicadas.",
    features: ["Jeans e camisetas", "Peças confortáveis", "Cores neutras", "Tênis e rasteirinhas"],
    stores: ["Hering", "Riachuelo", "C&A", "Renner", "Marisa"],
  },
]

document.addEventListener("DOMContentLoaded", () => {
  const stylesGrid = document.getElementById("stylesGrid")

  stylesGrid.innerHTML = stylesData
    .map(
      (style) => `
        <div class="style-card">
            <div class="style-header">
                <div class="style-icon">${style.icon}</div>
                <h3 class="style-name">${style.name}</h3>
            </div>
            <p class="style-description">${style.description}</p>
            <div class="style-features">
                <h4>Características:</h4>
                <ul>
                    ${style.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
            </div>
            <div class="style-stores">
                <h4>Onde Comprar:</h4>
                <div class="store-tags">
                    ${style.stores.map((store) => `<span class="store-tag">${store}</span>`).join("")}
                </div>
            </div>
        </div>
    `,
    )
    .join("")
})
