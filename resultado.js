// Load and display results
document.addEventListener("DOMContentLoaded", () => {
  const analysisData = localStorage.getItem("divaImperialAnalysis")

  if (!analysisData) {
    window.location.href = "reconhecimento.html"
    return
  }

  const results = JSON.parse(analysisData)

  // Display season
  const seasonResult = document.getElementById("seasonResult")
  seasonResult.innerHTML = `
        <div class="season-badge">${results.season}</div>
        <p class="season-description">
            ${getSeasonDescription(results.season)}
        </p>
    `

  // Display color palette
  const colorPalette = document.getElementById("colorPalette")
  colorPalette.innerHTML = results.colorPalette
    .map((color) => `<div class="color-swatch" style="background-color: ${color}"></div>`)
    .join("")

  // Display recommended styles
  const stylesResult = document.getElementById("stylesResult")
  stylesResult.innerHTML = results.recommendedStyles.map((style) => `<div class="style-badge">${style}</div>`).join("")
})

function getSeasonDescription(season) {
  const descriptions = {
    "Primavera Quente":
      "Você possui tons quentes e vibrantes que harmonizam perfeitamente com cores alegres e luminosas.",
    "Verão Suave": "Suas características suaves pedem cores delicadas e frias que realçam sua beleza natural.",
    "Outono Profundo": "Tons terrosos e profundos complementam perfeitamente sua paleta natural rica e acolhedora.",
    "Inverno Intenso": "Seu alto contraste natural combina com cores intensas e dramáticas que destacam sua presença.",
  }
  return descriptions[season] || "Descubra as cores que mais combinam com você!"
}
