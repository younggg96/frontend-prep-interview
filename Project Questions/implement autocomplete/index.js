var search_terms = ['apple', 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12']

const input = document.querySelector("input")
const res = document.querySelector("#result")
let terms = []

input.addEventListener('blur', () => {
    res.style.display = "none"
})

input.addEventListener('focus', () => {
    res.style.display = "block"
})

input.addEventListener('input', (event) => {
    const value = event.target.value
    let list = ''
    terms = autocompleteMatch(value)
    terms.forEach(ele => {
        list += `<li>${ele}</li>`
    })
    res.innerHTML = `<ul>${list}</ul>`
})

const autocompleteMatch = (input) => {
    if (!input) return []
    return search_terms.filter((item) => {
        return item.includes(input)
    })
}