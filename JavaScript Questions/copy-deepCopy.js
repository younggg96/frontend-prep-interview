// DeepCopy 将数据中所有的数据拷贝下来，对拷贝之后的数据进行修改不会影响到原数据。

// 1. JSON.parse(JSON.stringify(obj))
// 不支持值为undefined、函数和循环引用的情况
const cloneObj = JSON.parse(JSON.stringify(obj));

// JSON.parse(JSON.stringify(obj))深拷贝的缺陷

// 1、如果obj里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
// 2、如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象。
// 3、如果obj里有函数，undefined，则序列化的结果会把函数， undefined丢失。
// 4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
// 5、JSON.stringify()只能序列化对象的可枚举的自有属性。如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor。
// 6、如果对象中存在循环引用的情况也无法正确实现深拷贝。

// 2 递归的方式深拷贝
function deepClone(obj, cache = new WeakMap()) {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    if (cache.has(obj)) return cache.get(obj); // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
    let cloneObj = new obj.constructor(); // 使用对象所属的构造函数创建一个新对象
    cache.set(obj, cloneObj); // 缓存对象，用于循环引用的情况

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
        }
    }
    return cloneObj;
}

// 测试
const obj = { name: "Jack", address: { x: 100, y: 200 } };
obj.a = obj; // 循环引用
const newObj = deepClone(obj);
console.log(newObj.address === obj.address); // false