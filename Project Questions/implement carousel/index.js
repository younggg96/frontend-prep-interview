const track = document.querySelector(".carousel-track")
const slides = [...track.children]
const nextBtn = document.querySelector(".carousel-btn.right")
const prevBtn = document.querySelector(".carousel-btn.left")

slides.forEach((slide, index) => {
    slide.style.left = `${slide.clientWidth * index}px`
})

nextBtn.addEventListener("click", () => {
    const curSlide = track.querySelector(".cur-slide")
    const nextSlide = curSlide.nextElementSibling
    const amountToMove = nextSlide.style.left
    track.style.transform = `translateX(-${amountToMove})`
    curSlide.classList.remove('cur-slide')
    nextSlide.classList.add('cur-slide')
})
