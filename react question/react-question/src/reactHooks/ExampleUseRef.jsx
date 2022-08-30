import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
/**
 * 1. useRef是一个方法，且useRef返回一个可变的ref对象（对象！！！）
 * 2. initialValue被赋值给其返回值的.current对象
 * 3. 可以保存任何类型的值:dom、对象等任何可辨值
 * 4. ref对象与自建一个{current：‘’}对象的区别是：useRef会在每次渲染时返回同一个ref对象，
 *    即返回的ref对象在组件的整个生命周期内保持不变。自建对象每次渲染时都建立一个新的。
 * 5. ref对象的值发生改变之后，不会触发组件重新渲染。有一个窍门，把它的改边动作放到useState()之前。
本质上，useRef就是一个其.current属性保存着一个可变值“盒子”。目前我用到的是pageRef和sortRef分别用来保存分页信息和排序信息。

 * @returns example
 */

/**
 * 1. useImperativeHandle(ref,createHandle,[deps])
 * 可以自定义暴露给父组件的实例值。如果不使用，父组件的ref(chidlRef)访问不到任何值（childRef.current==null）
 * 2. useImperativeHandle应该与forwradRef搭配使用
 * 3. React.forwardRef会创建一个React组件，这个组件能够将其接受的ref属性转发到其组件树下的另一个组件中。
 * 4. React.forward接受渲染函数作为参数，React将使用prop和ref作为参数来调用此函数。
 */
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    say: sayHello,
  }));
  const sayHello = () => {
    alert("hello,我是子组件");
  };
  return <h3>子组件</h3>;
});

// const ChildComponent = (props, ref) => {
//   useImperativeHandle(ref, () => ({
//     say: sayHello,
//   }));
//   const sayHello = () => {
//     alert("hello,我是子组件");
//   };
//   return <h3>子组件</h3>;
// };
// const Child = forwardRef(ChildComponent)

export const ExampleUseRef = () => {
  const domRef = useRef(1);
  const childRef = useRef(null);
  useEffect(() => {
    console.log("ref:deom-init", domRef, domRef.current);
    console.log("ref:child-init", childRef, childRef.current);
  });
  const showChild = () => {
    console.log("ref:child", childRef, childRef.current);
    childRef.current.say();
  };
  return (
    <div style={{ margin: "100px", border: "2px dashed", padding: "20px" }}>
      <h2>这是外层组件</h2>
      <div
        onClick={() => {
          console.log("ref:deom", domRef, domRef.current);
          domRef.current.focus();
          domRef.current.value = "hh";
        }}
      >
        <label>这是一个dom节点</label>
        <input ref={domRef} />
      </div>
      <br />
      <p onClick={showChild} style={{ marginTop: "20px" }}>
        这是子组件
      </p>
      <div style={{ border: "1px solid", padding: "10px" }}>
        <Child ref={childRef} />
      </div>
    </div>
  );
};

// useRef，他的作用是“勾住”某些组件挂载完成或重新渲染完成后才拥有的某些对象，并返回该对象的引用。
// 该引用在组件整个生命周期中都固定不变，该引用并不会随着组件重新渲染而失效。

// 某些对象”主要分为3种：JSX组件转换后对应的真实DOM对象、在useEffect中创建的变量、子组件内自定义的函数(方法)

// 第1：JSX组件转换后对应的真实DOM对象：
// 举例：假设在JSX中，有一个输入框<input type='text' />，这个标签最终将编译转换成真正的html标签中的<input type='text'/>。
// 你应该知道以下几点：
// 1、JSX中小写开头的组件看似和原生html标签相似，但是并不是真的原生标签，依然是react内置组件。
// 2、什么时候转换？ 虚拟DOM转化为真实DOM
// 3、什么时候可访问？组件挂载完成或重新渲染完成后

// 对于上面举例中的那个转换后的<input/> 真实DOM，只有组件挂载完成或重新渲染完成后才可以访问，它就就属于“某些组件挂载完成或重新渲染完成后才拥有的某些对象”。

// 特别强调：useRef只适合“勾住”小写开头的类似原生标签的组件。如果是自定义的react组件(自定义的组件必须大写字母开头)，那么是无法使用useRef的。

// 第2：在useEffect中创建的变量：
// 举例，请看以下代码：

// useEffect(() => {
//     let timer = setInterval(() => {
//         setCount(prevData => prevData +1);
//     }, 1000);
//     return () => {
//         clearInterval(timer);
//     }
// },[]);
// 上述代码中，请注意这个timer是在useEffect中才定义的。
// 思考：useEffect 以外的地方，该如何获取这个 timer 的引用？
// 答：用useRef