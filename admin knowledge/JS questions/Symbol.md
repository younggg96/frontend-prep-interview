Symbol
一.概述 1.基本概念
ES6 引进一种新的原始数据类型 Symbol,表示独一无二的值。
Symbol 值通过 Symbol 函数生成,也就是对象的属性名可以有两种类型，原有的字符串和新增的 Symbol 类型。

```
let s = Symbol();

typeof s
// "symbol"
```

注意：注意，Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
2.参数
（1）字符串：对 Symbol 实例的描述，（主要是为了在控制台显示，或者转为字符串时，比较容易区分）

```
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

（2）对象(就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值)
```
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

注意：相同参数的Symbol函数的返回值是不相等的
理由：Symbol函数的参数只是表示对当前 Symbol 值的描述
```
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```
3.转换
只可以转换为以下两种类型
（1）转为字符串
```
let sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

（2）转为布尔值
```
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```