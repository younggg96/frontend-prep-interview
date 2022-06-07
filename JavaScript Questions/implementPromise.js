class MyPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(executor) {
        this.status = MyPromise.PENDING
        this.value = null
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve (value) {
        if (this.status == MyPromise.PENDING) {
            this.status = MyPromise.FULFILLED
            this.value = value
        }
    }
    reject (value) {
        if (this.status == MyPromise.PENDING) {
            this.status = MyPromise.REJECTED
            this.value = value
        }
    }

}