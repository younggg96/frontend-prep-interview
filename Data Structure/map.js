const names = {
  1: "One",
  2: "Two",
};

Object.keys(names); // => ['1', '2']

/**
 * Map 接受任何类型的键
 */

const numbersMap = new Map();

numbersMap.set(1, "one");
numbersMap.set(2, "two");

[...numbersMap.keys()]; // => [1, 2]

// WeakMap (Map的一个专门版本)不需要这么麻烦就能做到上面的事情:它只接受对象作为键。
// Map 和 Weakmap 之间的主要区别是，Weakmap 允许对键对象进行垃圾收集，从而防止内存泄漏。
// 好了，用 WeakMap 重构上面的代码就变得很简单了：

const foo = { name: "foo" };
const bar = { name: "bar" };

const mapOfObjects = new WeakMap();

mapOfObjects.set(foo, "Foo related data");
mapOfObjects.set(bar, "Bar related data");

mapOfObjects.get(foo); // => 'Foo related data'
// 与 Map 相反，WeakMap 只接受对象作为键

/**
 * Map 对键名没有限制
 */

function isPlainObject(value) {
  return value.toString() === "[object Object]";
}

const actor = {
  name: "Harrison Ford",
  toString: "Actor: Harrison Ford",
};

// Does not work!
// isPlainObject(actor);

function isMap(value) {
  return value.toString() === "[object Map]";
}

const actorMap = new Map();

actorMap.set("name", "Harrison Ford");
actorMap.set("toString", "Actor: Harrison Ford");

// Works!
isMap(actorMap); // => true

/**
 * map 是可迭代
 */

const colorsHex = {
  white: "#FFFFFF",
  black: "#000000",
};

for (const [color, hex] of Object.entries(colorsHex)) {
  console.log(color, hex);
}

// Object.entries(xxx) or Object.keys(xxx)

const colorsHexMap = new Map();

colorsHexMap.set("white", "#FFFFFF");
colorsHexMap.set("black", "#000000");

for (const [color, hex] of colorsHexMap) {
  console.log(color, hex);
}
// 'white' '#FFFFFF'
// 'black' '#000000'

/**
 * map 的大小
 */
const examsMap = new Map([
  ["John Smith", "10 points"],
  ["Jane Doe", "8 points"],
]);

// examsMap.size;

const map = new Map();
const obj = { p: "hello" };

/**
 *  size：获取成员的数量
    set：设置成员 key 和 value
    get：获取成员属性值
    has：判断成员是否存在
    delete：删除成员
    clear：清空所有
 */

map.set(obj, "ok");
map.get(obj);
map.has(obj); // true;
map.delete(obj);

const map2 = new Map();
map2.set("aaa", 100);
map2.set("bbb", 200);

for (let key of map2.keys()) {
  console.log(key);
}
// "aaa"
// "bbb"

for (let value of map2.values()) {
  console.log(value);
}
// 100
// 200

for (let item of map2.entries()) {
  console.log(item[0], item[1]);
}
// aaa 100
// bbb 200

// 或者
for (let [key, value] of map2.entries()) {
  console.log(key, value);
}
// aaa 100
// bbb 200
