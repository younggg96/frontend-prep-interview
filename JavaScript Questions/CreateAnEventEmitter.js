// There is Event Emitter in Node.js, Facebook once had its own implementation but now it is archived.

// You are asked to create an Event Emitter Class

// const emitter = new Emitter()
// It should support event subscribing

// const sub1  = emitter.subscribe('event1', callback1)
// const sub2 = emitter.subscribe('event2', callback2)
// // same callback could subscribe
// // on same event multiple times
// const sub3 = emitter.subscribe('event1', callback1)
// emit(eventName, ...args) is used to trigger the callbacks, with args relayed

// emitter.emit('event1', 1, 2);
// // callback1 will be called twice
// Subscription returned by subscribe() has a release() method that could be used to unsubscribe

// sub1.release()
// sub3.release()
// // now even if we emit 'event1' again,
// // callback1 is not called anymore

// please complete the implementation
class EventEmitter {
  constructor() {
    this.events = {}; // 存储事件及其回调
  }

  subscribe(eventName, callback) {
    // 初始化事件
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    // 为回调函数生成唯一 ID
    const callbackObj = { id: Symbol(), callback };

    // 将回调对象存入事件列表
    this.events[eventName].push(callbackObj);

    // 返回带有 release 方法的对象以取消订阅
    return {
      release: () => {
        this.events[eventName] = this.events[eventName].filter(
          (cbObj) => cbObj.id !== callbackObj.id
        );
        // 如果该事件没有回调，则删除事件条目
        if (this.events[eventName].length === 0) {
          delete this.events[eventName];
        }
      },
    };
  }

  emit(eventName, ...args) {
    // 遍历并执行所有与事件关联的回调
    if (this.events[eventName]) {
      this.events[eventName].forEach((cbObj) => cbObj.callback(...args));
    }
  }
}

const emitter = new EventEmitter();
const callback1 = (a, b) => console.log("callback1 被调用，参数为", a, b);

emitter.subscribe("event1", callback1);
emitter.emit("event1", 1, 2);
