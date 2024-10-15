function virtualize(element) {
  const type = element.tagName.toLowerCase();

  const props = {};
  if (element.hasAttributes()) {
    for (let { name, value } of element.attributes) {
      props[name == "class" ? "className" : name] = value;
    }
  }

  const children = [];
  if (element.hasChildNodes()) {
    for (const child of element.childNodes) {
      if (child.nodeType === 3) {
        children.push(child.textContent);
      } else if (child.nodeType === 1) {
        children.push(virtualize(child));
      }
    }
  }

  if (children.length) {
    if (children.length === 1) {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  return { type, props };
}

function render(obj) {
  // render self
  let {
    type,
    props: { className, children, ...restProps },
  } = obj;
  const ele = document.createElement(type);
  // add className
  if (className) ele.classList.add(className);
  // append children
  if (children) {
    // make sure children is Array
    if (!(children instanceof Array)) {
      children = [children];
    }
    // render each child and append it to parent
    children.forEach((child) => {
      // text node
      if (typeof child == "string") {
        ele.append(document.createTextNode(child));
      } else {
        ele.append(render(child));
      }
    });
  }
  // add rest props to ele
  if (restProps) {
    Object.entries(restProps).forEach(([key, value]) => {
      ele.setAttribute(key, value);
    });
  }
  return ele;
}
