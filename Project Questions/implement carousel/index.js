const track = document.querySelector(".carousel-track")
const nav = document.querySelector(".carousel-nav")
const slides = [...track.children]
const nextBtn = document.querySelector(".carousel-btn.right")
const prevBtn = document.querySelector(".carousel-btn.left")
const indicators = document.querySelectorAll(".carousel-indicator")

const setSlide = (slide, index) => {
    slide.style.left = `${slide.clientWidth * index}px`
}

slides.forEach(setSlide)

nextBtn.addEventListener("click", () => {
    const curSlide = track.querySelector(".cur-slide")
    const curIndicator = nav.querySelector(".cur")
    const nextSlide = curSlide.nextElementSibling
    const nextIndicator = curIndicator.nextElementSibling
    if (nextSlide) {
        const amountToMove = nextSlide.style.left
        track.style.transform = `translateX(-${amountToMove})`
        curSlide.classList.remove('cur-slide')
        curIndicator.classList.remove('cur')
        nextSlide.classList.add('cur-slide')
        nextIndicator.classList.add('cur')
    } else {
        const amountToMove = slides[0].style.left
        track.style.transform = `translateX(-${amountToMove})`
        curSlide.classList.remove('cur-slide')
        curIndicator.classList.remove('cur')
        slides[0].classList.add('cur-slide')
        indicators[0].classList.add('cur')
    }
})

prevBtn.addEventListener("click", () => {
    const curSlide = track.querySelector(".cur-slide")
    const curIndicator = nav.querySelector(".cur")
    const prevSlide = curSlide.previousElementSibling
    const prevIndicator = curIndicator.previousElementSibling
    if (prevSlide) {
        const amountToMove = prevSlide.style.left
        track.style.transform = `translateX(-${amountToMove})`
        curSlide.classList.remove('cur-slide')
        curIndicator.classList.remove('cur')
        prevSlide.classList.add('cur-slide')
        prevIndicator.classList.add('cur')
    } else {
        const amountToMove = slides[slides.length - 1].style.left
        track.style.transform = `translateX(-${amountToMove})`
        curSlide.classList.remove('cur-slide')
        curIndicator.classList.remove('cur')
        slides[slides.length - 1].classList.add('cur-slide')
        indicators[slides.length - 1].classList.add('cur')
    }
})
