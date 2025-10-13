// Camera functionality
let stream = null
const step = "idle" // idle, camera, analyzing, complete

const idleState = document.getElementById("idleState")
const cameraState = document.getElementById("cameraState")
const analyzingState = document.getElementById("analyzingState")
const completeState = document.getElementById("completeState")
const cameraControls = document.getElementById("cameraControls")
const videoElement = document.getElementById("videoElement")
const canvas = document.getElementById("canvas")

const startCameraBtn = document.getElementById("startCameraBtn")
const captureBtn = document.getElementById("captureBtn")
const cancelBtn = document.getElementById("cancelBtn")

function showState(stateName) {
  idleState.classList.add("hidden")
  cameraState.classList.add("hidden")
  analyzingState.classList.add("hidden")
  completeState.classList.add("hidden")
  cameraControls.classList.add("hidden")

  if (stateName === "idle") {
    idleState.classList.remove("hidden")
  } else if (stateName === "camera") {
    cameraState.classList.remove("hidden")
    cameraControls.classList.remove("hidden")
  } else if (stateName === "analyzing") {
    analyzingState.classList.remove("hidden")
  } else if (stateName === "complete") {
    completeState.classList.remove("hidden")
  }
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 1280, height: 720 },
    })
    videoElement.srcObject = stream
    showState("camera")
  } catch (error) {
    alert("Erro ao acessar câmera. Por favor, permita o acesso à câmera para continuar.")
    console.error("Camera error:", error)
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }
}

function captureAndAnalyze() {
  const context = canvas.getContext("2d")
  canvas.width = videoElement.videoWidth
  canvas.height = videoElement.videoHeight
  context.drawImage(videoElement, 0, 0)

  showState("analyzing")

  // Simulate AI analysis
  setTimeout(() => {
    showState("complete")

    // Generate random results
    const seasons = ["Primavera Quente", "Verão Suave", "Outono Profundo", "Inverno Intenso"]
    const styles = ["Vintage", "Streetwear", "Old Money", "Gótico", "Coquette", "Casual"]
    const colorPalettes = {
      "Primavera Quente": ["#FFD700", "#FF6B6B", "#4ECDC4", "#95E1D3"],
      "Verão Suave": ["#B4A7D6", "#D4A5A5", "#9ED2C6", "#F7DC6F"],
      "Outono Profundo": ["#8B4513", "#D2691E", "#CD853F", "#DEB887"],
      "Inverno Intenso": ["#000000", "#FFFFFF", "#FF0080", "#4169E1"],
    }

    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)]
    const randomStyles = styles.sort(() => 0.5 - Math.random()).slice(0, 3)

    const results = {
      season: randomSeason,
      colorPalette: colorPalettes[randomSeason],
      recommendedStyles: randomStyles,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("divaImperialAnalysis", JSON.stringify(results))

    setTimeout(() => {
      stopCamera()
      window.location.href = "resultado.html"
    }, 2000)
  }, 3000)
}

if (startCameraBtn) {
  startCameraBtn.addEventListener("click", startCamera)
}

if (captureBtn) {
  captureBtn.addEventListener("click", captureAndAnalyze)
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    stopCamera()
    showState("idle")
  })
}

// Cleanup on page unload
window.addEventListener("beforeunload", stopCamera)
