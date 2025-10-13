// Feedback form handling
document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm")
  const feedbackSuccess = document.getElementById("feedbackSuccess")
  const ratingStars = document.getElementById("ratingStars")
  const ratingInput = document.getElementById("rating")

  // Star rating
  const stars = ratingStars.querySelectorAll(".star")
  let selectedRating = 0

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      selectedRating = Number.parseInt(this.dataset.rating)
      ratingInput.value = selectedRating
      updateStars()
    })

    star.addEventListener("mouseenter", function () {
      const hoverRating = Number.parseInt(this.dataset.rating)
      stars.forEach((s, index) => {
        if (index < hoverRating) {
          s.classList.add("active")
        } else {
          s.classList.remove("active")
        }
      })
    })
  })

  ratingStars.addEventListener("mouseleave", updateStars)

  function updateStars() {
    stars.forEach((star, index) => {
      if (index < selectedRating) {
        star.classList.add("active")
      } else {
        star.classList.remove("active")
      }
    })
  }

  // Form submission
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      rating: ratingInput.value,
      message: document.getElementById("message").value,
      timestamp: new Date().toISOString(),
    }

    // Save to localStorage (in a real app, this would be sent to a server)
    const feedbacks = JSON.parse(localStorage.getItem("divaImperialFeedbacks") || "[]")
    feedbacks.push(formData)
    localStorage.setItem("divaImperialFeedbacks", JSON.stringify(feedbacks))

    // Show success message
    feedbackForm.classList.add("hidden")
    feedbackSuccess.classList.remove("hidden")
  })
})
