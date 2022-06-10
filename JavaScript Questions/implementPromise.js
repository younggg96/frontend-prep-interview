class MyPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(executor) {
        this.status = MyPromise.PENDING
        this.value = null
        this.callbacks = []
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

    then (onFilfilled, onRejected) {
        if (typeof onFilfilled != "function") {
            onFilfilled = value => value
        }
        if (typeof onRejected != "function") {
            onRejected = value => value
        }
        if (this.status == MyPromise.PENDING) {
            this.callbacks.push({
                onFilfilled: value => {
                    try {
                        onFilfilled(value)
                    } catch (error) {
                        onRejected(error)
                    }
                },
                onRejected: value => {
                    try {
                        onRejected(value)
                    } catch (error) {
                        onRejected(error)
                    }
                }
            })
        }
        if (this.status == MyPromise.FULFILLED) {
            setTimeout(() => {
                try {
                    onFilfilled(this.value)
                } catch (error) {
                    onRejected(error)
                }
            })
        }
        if (this.status == MyPromise.REJECTED) {
            setTimeout(() => {
                try {
                    onRejected(this.value)
                } catch (error) {
                    onRejected(error)
                }
            })
        }
    }

}