
export class Deferred {
    promise = null;

    resolve = null;

    reject = null;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }
}
