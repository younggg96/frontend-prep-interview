/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 */

/**
 * @param { string } type - valid HTML tag name
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  // your code here
  const element = document.createElement(type);
  for (let key in props) {
    element.setAttribute(key === "className" ? "class" : key, props[key]);
  }

  for (let child of children) {
    if (typeof child === "string") {
      element.append(document.createTextNode(child));
    } else {
      element.append(child);
    }
  }
  return element;
}

/**
 * @param { MyElement }
 * @returns { HTMLElement }
 */
function render(myElement) {
  // your code here
  return myElement;
}

const h = createElement;
render(
  h(
    "div",
    {},
    h("h1", {}, " this is "),
    h(
      "p",
      { className: "paragraph" },
      " a ",
      h("button", {}, " button "),
      " from ",
      h("a", { href: "https://bfe.dev" }, h("b", {}, "BFE"), ".dev")
    )
  )
);
