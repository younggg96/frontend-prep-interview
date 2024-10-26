// class MyPromise {
//     static PENDING = "pending";
//     static FULFILLED = "fulfilled";
//     static REJECTED = "rejected";
//     constructor(executor) {
//         this.status = MyPromise.PENDING
//         this.value = null
//         this.callbacks = []
//         try {
//             executor(this.resolve.bind(this), this.reject.bind(this))
//         } catch (error) {
//             this.reject(error)
//         }
//     }
//     resolve (value) {
//         if (this.status == MyPromise.PENDING) {
//             this.status = MyPromise.FULFILLED
//             this.value = value
//         }
//     }
//     reject (value) {
//         if (this.status == MyPromise.PENDING) {
//             this.status = MyPromise.REJECTED
//             this.value = value
//         }
//     }
//     then (onFilfilled, onRejected) {
//         if (typeof onFilfilled != "function") {
//             onFilfilled = value => value
//         }
//         if (typeof onRejected != "function") {
//             onRejected = value => value
//         }
//         if (this.status == MyPromise.PENDING) {
//             this.callbacks.push({
//                 onFilfilled: value => {
//                     try {
//                         onFilfilled(value)
//                     } catch (error) {
//                         onRejected(error)
//                     }
//                 },
//                 onRejected: value => {
//                     try {
//                         onRejected(value)
//                     } catch (error) {
//                         onRejected(error)
//                     }
//                 }
//             })
//         }
//         if (this.status == MyPromise.FULFILLED) {
//             setTimeout(() => {
//                 try {
//                     onFilfilled(this.value)
//                 } catch (error) {
//                     onRejected(error)
//                 }
//             })
//         }
//         if (this.status == MyPromise.REJECTED) {
//             setTimeout(() => {
//                 try {
//                     onRejected(this.value)
//                 } catch (error) {
//                     onRejected(error)
//                 }
//             })
//         }
//     }
// }

// promise.then((result) => {
// handle resolve a successful result
// }, (error) => {
// handle error
// })

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(result) {
    if (this.state !== "pending") return;

    this.state = "fulfilled";
    this.result = result;

    queueMicrotask(() => {
      if (this.onFulfilled === undefined) return;

      try {
        const returnValue = this.onFulfilled(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  _reject(error) {
    if (this.state !== "pending") return;

    this.state = 'rejected';
    this.result = error;

    queueMicrotask(() => {
      if (this.onRejected === undefined) return;

      try {
        const returnValue = this.onRejected(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseReject(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
    this.state = "rejected";
    this.result = error;
  }

  then(onFulfilled, onRejected) {
    const isOnFulfilledFunction = typeof onFulfilled === "function";
    this.onFulfilled = isOnFulfilledFunction ? onFulfilled : (value) => value;

    const isOnRejectedFunction = typeof onRejected === "function";
    this.onRejected = isOnRejectedFunction
      ? onRejected
      : (error) => {
          throw error;
        };
    return new MyPromise((resolve, reject) => {
      // Register `resolve` and `reject`, so that we can
      // resolve or reject this promise in `_resolve`
      // or `_reject`.
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    const isValuePromise = value instanceof MyPromise;
    if (isValuePromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }
}
