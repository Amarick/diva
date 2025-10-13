// Colorimetry data and rendering
const seasonsData = [
  {
    name: "Primavera Quente",
    description:
      "Tons quentes, claros e vibrantes que trazem frescor e luminosidade. Perfeito para quem tem pele com subtom dourado.",
    colors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#95E1D3", "#FFA07A", "#98D8C8", "#F7DC6F", "#FF9FF3"],
    recommendations:
      "Use cores vivas e quentes como coral, pêssego, verde-água e dourado. Evite cores muito escuras ou frias.",
  },
  {
    name: "Verão Suave",
    description:
      "Tons frios, suaves e delicados que transmitem serenidade. Ideal para pele com subtom rosado ou azulado.",
    colors: ["#B4A7D6", "#D4A5A5", "#9ED2C6", "#F7DC6F", "#AED9E0", "#FAE3D9", "#C5B9CD", "#E8D5C4"],
    recommendations:
      "Prefira cores suaves e frias como lavanda, rosa empoeirado, azul claro e cinza. Evite cores muito vibrantes.",
  },
  {
    name: "Outono Profundo",
    description:
      "Tons quentes, profundos e terrosos que trazem aconchego. Perfeito para pele com subtom dourado ou oliváceo.",
    colors: ["#8B4513", "#D2691E", "#CD853F", "#DEB887", "#A0522D", "#BC8F8F", "#DAA520", "#B8860B"],
    recommendations:
      "Use cores terrosas e quentes como marrom, caramelo, verde-oliva e mostarda. Evite cores muito claras ou frias.",
  },
  {
    name: "Inverno Intenso",
    description:
      "Tons frios, intensos e contrastantes que transmitem dramaticidade. Ideal para quem tem alto contraste natural.",
    colors: ["#000000", "#FFFFFF", "#FF0080", "#4169E1", "#8B008B", "#DC143C", "#00CED1", "#4B0082"],
    recommendations:
      "Prefira cores intensas e frias como preto, branco puro, pink vibrante e azul royal. Evite cores suaves ou terrosas.",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  const seasonsGrid = document.getElementById("seasonsGrid")

  seasonsGrid.innerHTML = seasonsData
    .map(
      (season) => `
        <div class="season-card">
            <h3 class="season-name">${season.name}</h3>
            <p class="season-desc">${season.description}</p>
            <div class="season-colors">
                ${season.colors
                  .map((color) => `<div class="season-color" style="background-color: ${color}"></div>`)
                  .join("")}
            </div>
            <div class="season-recommendations">
                <h4>Recomendações:</h4>
                <p>${season.recommendations}</p>
            </div>
        </div>
    `,
    )
    .join("")
})
