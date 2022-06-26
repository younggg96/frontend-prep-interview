const totalPage = 10
const showPage = 5
let curPage = 5
let data = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"]

// mounted
const list = document.querySelector(".pagination-list")
const content = document.querySelector(".content")
function mounted () {
    let paginationList = ''
    for (let i = 0; i < totalPage; i++) {
        if (i == curPage) {
            paginationList += `<li class="page active">${i + 1}</li>`
            continue
        }
        paginationList += `<li class="page">${i + 1}</li>`
    }
    content.innerHTML = `${data[curPage]}`
    list.innerHTML = paginationList
}
mounted()

// event listener
// click page
const pages = document.querySelectorAll(".pagination-list .page")
pages.forEach((page, i) => {
    page.addEventListener('click', () => {
        if ([...page.classList].includes('active')) return
        curPage = i
        console.log(curPage)
        content.innerHTML = `${data[curPage]}`
        const activePage = document.querySelector(".pagination-list .active")
        activePage.classList.remove('active')
        page.classList.add('active')
    })
})

// click btn
const prev = document.querySelector(".pagination-btn.prev")
const next = document.querySelector(".pagination-btn.next")
prev.addEventListener('click', () => {
    if (curPage > 0) {
        curPage--
        content.innerHTML = `${data[curPage]}`
        const activePage = document.querySelector(".pagination-list .active")
        activePage.classList.remove('active')
        pages.forEach((p, i) => {
            if (i == curPage) {
                p.classList.add("active")
            }
        })
    }
})

next.addEventListener('click', () => {
    if (curPage < totalPage - 1) {
        curPage++
        content.innerHTML = `${data[curPage]}`
        const activePage = document.querySelector(".pagination-list .active")
        activePage.classList.remove('active')
        pages.forEach((p, i) => {
            if (i == curPage) {
                p.classList.add("active")
            }
        })
    }
})