// async;
// 下面在 hd 函数前加上 async，函数将返回 promise，我们就可以像使用标准 Promise 一样使用了。
async function hd() {
  return "houdunren.com";
}
console.log(hd());
hd().then((value) => {
  console.log(value);
});

// 如果有多个 await 需要排队执行完成，我们可以很方便的处理多个异步队列

async function hd(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, 2000);
  });
}
async function run() {
  let h1 = await hd("后盾人");
  console.log(h1);
  let h2 = await hd("houdunren.com");
  console.log(h2);
}
run();

// await
// 使用 await 关键词后会等待 promise 完

// await 后面一般是 promise，如果不是直接返回
// await 必须放在 async 定义的函数中使用
// await 用于替代 then 使编码更优雅
// 下例会在 await 这行暂停执行，直到等待 promise 返回结果后才继执行。

async function hd() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("houdunren.com");
    }, 2000);
  });
  let result = await promise;
  console.log(result);
}
hd();
// 一般 await 后面是外部其它的 promise 对象

async function hd() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("fulfilled");
    }, 2000);
  });
}
async function run() {
  let value = await hd();
  console.log("houdunren.com");
  console.log(value);
}
run();

// 下面是请求后台获取用户课程成绩的示例

async function user() {
  let user = await ajax(`http://localhost:8888/php/user.php?name=向军`);
  let lessons = await ajax(
    `http://localhost:8888/php/houdunren.php?id=${user.id}`
  );
  console.log(lessons);
}
// 也可以将操作放在立即执行函数中完成

(async () => {
  let user = await ajax(`http://localhost:8888/php/user.php?name=向军`);
  let lessons = await ajax(
    `http://localhost:8888/php/houdunren.php?id=${user.id}`
  );
  console.log(lessons);
})();
// 下面是使用 async 设置定时器，并间隔时间来输出内容

async function sleep(ms = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function run() {
  for (const value of ["后盾人", "向军"]) {
    await sleep();
    console.log(value);
  }
}
run();


// 并发执行
// 有时需要多个 await 同时执行，有以下几种方法处理，下面多个 await 将产生等待

async function p1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("houdunren");
      resolve();
    }, 2000);
  });
}
async function p2() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("hdcms");
      resolve();
    }, 2000);
  });
}
async function hd() {
  await p1();
  await p2();
}
hd();

// 使用 Promise.all() 处理多个 promise 并行执行

async function hd() {
  await Promise.all([p1(), p2()]);
}
hd();
// 让 promise 先执行后再使用 await 处理结果

async function hd() {
  let h1 = p1();
  let h2 = p2();
  await h1;
  await h2;
}
hd();