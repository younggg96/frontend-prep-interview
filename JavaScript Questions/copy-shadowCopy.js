// shadow copy
// 只是将数据中所有的数据引用下来，依旧指向同一个存放地址，
// 拷贝之后的数据修改之后，也会影响到原数据的中的对象数据。
// 例如:Object.assign(),...扩展运算符,或者直接复制。

// 1. assign
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy);

const obj2 = {
    a: 1,
    innerObj: { b: 2 },
};
const copy2 = Object.assign({}, obj);
obj.a = 10; //  原对象改变 ，不影响拷贝对象的第一层属性值，
obj.innerObj.b = 20; // 源值是一个对象的引用，它仅仅会复制其引用值，只拷贝可枚举的属性值
console.log(copy2);
console.log(obj2);
//输出
// { a: 1, innerObj: { b: 20 } }
// { a: 10, innerObj: { b: 20 } }

// 使用Object.assingn()合并对象
// 注意像下面代码那样的话，目标对象自身也会改变。如果不改变原对象，可以这样Object.assign({},o1, o2, o3)用一个空对象作为目标对象对象。
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj3 = Object.assign(o1, o2, o3);
console.log(obj3); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变

// 2. 使用直接复制的方式
const obj4 = {
    a: 1,
    innerObj: { b: 2 },
};
const copy4 = obj;
obj.a = 10; //  指向引用地址
obj.innerObj.b = 20; // 指向引用地址
console.log(copy4); // 引用地址指向的a 指向10 它的a也变成10
console.log(obj4);
//输出
// { a: 10, innerObj: { b: 20 } }
// { a: 10, innerObj: { b: 20 } }

// 3. ... 扩展符

// const copy = { ...obj } 和 Object.assign() 一样只是对第一层值做了值拷贝，遇到对象里面的对就是引用地址。