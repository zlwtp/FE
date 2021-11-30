
import Vue from 'vue'
import { Deferred } from '@2haohr/front-deferred'

export class App {
    constructor() {
        this.Vue = Vue
        this.Vue.$ctx = this.Vue.prototype.$ctx = {}
        this.VueOption = {}
        this.taskPool = {}// 任务池
        this.queue = []// 队列
    }

    sleep(timeout = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, timeout)
        })
    }

    // 获取所有定义的任务
    getAllTask() {
        return Object.keys(this.taskPool)
    }

    taskHandle(task, arg) {
        if (typeof task.install === 'function') {
            return task.install.apply(task.install, arg)
        } else if (typeof task === 'function') {
            return task.apply(task, arg)
        }
    }

    // 任务promise
    async getTaskPromise(key) {
        const task = this.taskPool[key]
        if (!task.promise) {
            const deferred = new Deferred()
            task.promise = deferred.promise
            task.callback = async() => {
                await Promise.all(task.deps.map(dep => {
                    if (this.taskPool[dep].promise) {
                        return this.taskPool[dep].promise
                    }
                    return this.getTaskPromise(dep)
                }))
                await this.taskHandle(task.handle, [this].concat(task.config))
                deferred.resolve()
            }
        }
        return task.promise
    }

    // 注入任务
    use(task, config) {
        if (typeof task === 'string' || Array.isArray(task)) {
            // 注入任务池中的任务
            const tasks = [].concat(task) // 转为数组
            this.queue.push(async() => {
                tasks.forEach(key => this.getTaskPromise(key))
                await Promise.all(tasks.map(key => this.taskPool[key].callback()))
            })
        } else {
            // 注入指定任务
            this.queue.push(() => this.taskHandle(task, [this].concat(config)))
        }
        return this
    }

    // 定义任务
    task(name, deps, handle, config) {
        if (!name) {
            throw new Error('app.task(name, deps, handle, config) 缺少name参数')
        }
        if (this.taskPool[name]) {
            throw new Error('任务已存在，请勿重复添加')
        }

        if (typeof deps === 'function') {
            config = handle
            handle = deps
            deps = []
        }

        this.taskPool[name] = {
            name,
            deps,
            handle,
            config
        }
        return this
    }

    // 启动
    async start(el = '#app') {
        console.time("build")
        for (const task of this.queue) {
            await task()
        }
        console.timeEnd("build")

        const instance = new Vue(this.VueOption)
        instance.$mount(el)
    }
}

export default () => new App()
