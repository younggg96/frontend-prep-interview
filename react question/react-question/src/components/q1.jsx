import { useState } from "react";

export default function Q1() {
  const [values, setValues] = useState([3, 6, 10]);
  const [res, setRes] = useState(null);

  const eventHandler = (e) => {
    const type = e.target.value;
    if (!values.length) return;
    if (type === "sum") {
      const sum = values.reduce((a, b) => a + b, 0);
      setRes(sum);
    } else if (type === "product") {
      const product = values.reduce((a, b) => a * b, 1);
      setRes(product);
    }
  };

  return (
    <div>
      <input
        type="radio"
        id="sum"
        name="example"
        value="sum"
        defaultChecked
        onChange={(e) => eventHandler(e)}
      />
      <label htmlFor="sum">sum</label>
      <input
        type="radio"
        id="product"
        name="example"
        value="product"
        onChange={(e) => eventHandler(e)}
      />
      <label htmlFor="product">product</label>
      <br />
      Result: {res && res}
    </div>
  );
}
