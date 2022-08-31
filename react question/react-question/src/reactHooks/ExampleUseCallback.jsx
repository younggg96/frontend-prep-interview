import { useCallback, useState } from "react";
/**
 * 他的作用是“勾住”组件属性中某些处理函数，创建这些函数对应在react原型链上的变量引用。
 * useCallback第2个参数是处理函数中的依赖变量，只有当依赖变量发生改变时才会重新修改并创建新的一份处理函数。
 * 请重点留意“修改”这个词，因为“修改”牵扯到react最为隐秘却极其重要的一层概念。
  “修改”有3种情况：
  1、用完全不一样的新值去替换之前的旧值 ——> 这会触发react重新渲染 ——> 例如{age:34}去替换{age:18}
  2、用和旧值看似一模一样的新值去替换之前的旧值 ——> 这依然会触发react重新渲染，因为react底层对新旧值做对比时使用的是 Object.is判断，字面上看似一模一样没有用，react依然会认为这是2个对象，依然会触发react重新渲染 ——> 例如{age:18}去替换{age:18}
  3、用旧值的引用去替换旧值 ——> 这次就不会触发重新渲染 ——> 例如let obj={age:18}; let obj2=obj，用obj2去替换obj

  为了提高react性能，就需要用旧值的引用去替换旧值，从而阻止本次无谓的渲染。

  问题的关键就在于“如何获取旧值的引用”？
  答：对于函数来说可以使用useCallback。

  只要依赖变量不发生变化，那么重新渲染时就可以一直使用之前创建的那个函数，达到阻止本次渲染，提升性能的目的。
  但是如果依赖变量发生变化，那么下次重新渲染时根据变量重新创建一份处理函数并替换React底层原型链上原有的处理函数。

 * @returns example
 */
export const ExampleUseCallback = () => {
  const [count, setCount] = useState(0);

  
//通过useCallback，将鼠标点击处理函数保存到React底层原型链中，并获取该函数的引用，将引用赋值给clickHandler。

// 只要依赖变量不发生变化，那么重新渲染时就可以一直使用之前创建的那个函数，达到阻止本次渲染，提升性能的目的。
// 但是如果依赖变量发生变化，那么下次重新渲染时根据变量重新创建一份处理函数并替换React底层原型链上原有的处理函数。
  const clickHandler = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  //由于该处理函数中使用到了count这个变量，因此useCallback的第2个参数中，需要将count添加进去

  //使用该处理函数，实为使用该处理函数的在React底层原型链上的引用
  return (
    <div>
      <button onClick={clickHandler}>click</button>
      {count}
    </div>
  );
};

// ***上面的示例伪代码仅仅是为了演示useCallback的使用方法，实际组件运用中，如果父组件中只有1个子组件，那其实完全没有必要使用useCallback。
// 只有父组件同时有多个子组件时，才有必要去做性能优化，防止某一个子组件引发的重新渲染也导致其他子组件跟着重新渲染。
