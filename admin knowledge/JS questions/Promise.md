# Promise
1. Promise有下面两个特点：对象的状态不受外界影响。有三种状态：padding(进行中)、fulfilled(成功)、rejected(失败)。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。三个状态只有从padding到fulfilled或者从padding到rejected。状态只有从padding改变到fulfilled或者refected，两种改变。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

### Promise存在的缺点
无法取消Promise，一旦新建它就会立即执行，无法中途取消。

如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```
const promise = new Promise((resolve, reject) => {
    let status = true;
    if(status) {
        resolve('success!')
    } else {
        reject('failed!')
    }
});

promise.then((res) => {
    console.log('success:' + res);
}, error => {
    console.log('fail:' + res);
})


```

ES6中，Promise对象是一个构造函数，用来生成Promise实例。
Promise构造函数接受一个函数作为参数，接受两个参数，分别是resolve和reject两个函数。

其中，resolve函数作用是将Promise的状态从padding改变成fufilled；而reject函数作用是将Promise的状态从padding改变成rejected。

在Promise实例生产后，可以用then方法分别指定了fufilled状态和rejected状态的回调函数。其中then方法接受两个参数，第一个回调函数是状态改变fufilled时调用的，第二个回调函数是状态改变refected时调用的。第二个参数是可选的，不一定要提供。

```
const promise = new Promise((resolve, reject) => {
  console.log('new Promise()');
  resolve();
});

promise.then(() => {
  console.log('resolve()');
});

console.log('End');

// 执行结果
// new Promise()
// End
// resolve()
```

### Promise的语法糖then
Promise实例具有then方法，then方法是定义在原型对象Promise.prototype上的。它的作用前面说过，第一个回调函数是状态改变fufilled时调用的，第二个回调函数(可选)是状态改变rejected时调用的。
```
new Promise((resolve, reject) => {
  resolve('hhh');
}).then(res => {
  console.log(res);
});
```

then方法的基础调用写法，可以写一个回调方法，来执行成功后的回调。then方法返回一个的是一个新的Promise实例，因此我们可以采用链式写法，即then方法后面再调用一个then方法。
```
new Promise((resolve, reject) => {
  resolve('hhh');
}).then(res => res).then(res => {
  console.log(res); // hhh
}
```

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

### Promise的语法糖catch
catch是用于指定发生错误的回调函数。
```
new Promise((resolve, reject) => {
  reject('失败');
}).catch(error => {
  console.log(error); // 失败
});
```

Promise实例当状态改变为rejected状态或者操作失败抛出异常错误，就会被catch方法捕获。所以在Promise实例中reject方法等同于抛出错误。如果Promise的状态已经变成了resolved，再抛出错误无效。
```
new Promise((resolve, reject) => {
  reject('失败');
  throw new Error('抛出异常'); // 这行无效
}).catch(error => {
  console.log(error); // 失败
});
```

### Promise的finally方法
finally方法用于指定不管Promis对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```
new Promise((resolve, reject) => {
  resolve();
}).then(res => {
  console.log('success');
}).catch(error => {
  console.log('error');
}).finally(() =>{
  console.log('finally');
})
```

### Promise的all方法
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。在all方法中可以传递多个Promise对象，当所有的Promise对象状态都返回fufilled，才会返回fulfilled，否则返回rejected。
```
const promise1 = new Promise((resolve, reject) => {
  resolve();
})
const promise2 = new Promise((resolve, reject) => {
  resolve();
})
const promise3 = new Promise((resolve, reject) => {
  resolve();
})

const promiseAll = Promise.all([promise1, promise2, promise3]).then(res => {
  console.log('all');
})
```

### Promise的race方法

Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。可以传递多个Promise对象作为参数，如果实例红有一个实例率先改变状态，那么race的状态就会跟着改变。
```
const promise1 = new Promise((resolve, reject) => {
  reject();
})
const promise2 = new Promise((resolve, reject) => {
  resolve();
})
const promise3 = new Promise((resolve, reject) => {
  reject();
})

const promiseRace = Promise.race([promise1, promise2, promise3]).then(res => {
  console.log('race then');
}).catch(error => {
  console.log('race catch');
})
```