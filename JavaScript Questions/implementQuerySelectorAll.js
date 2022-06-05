// function myQuerySelectorAll (selector) {
//     let result = []
//     traverse(document.documentElement)
//     function traverse (node) {
//         if (!node) return
//         if (isMatch(node, selector)) {
//             result.push(node)
//         }
//         for (let child of node.children) {
//             traverse(child)
//         }
//     }

//     function isMatch (element) {
//         return element.tagName === selector.toUpperCase() || Array.prototype.contains.call(element.classList, selector.slice(1))
//     }
//     return result
// }

const q = (element, selector) {
    const res = []
    const traverse = (node) => {
        if (!node) return
        if (isMatch(node)) {
            res.push(element)
        }
        for (let child of element.children) {
            traverse(child)
        }
    }
    const isMatch = (node) => {
        return node.tagName === selector.toUpperCase() || Array.prototype.contains.call(node.className, selector.slice(1))
    }
    traverse(document.documentElement)
    return res
}