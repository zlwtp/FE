export default ({ Vue }, option) => {
    Object.keys(option).forEach(key => {
        const originDescriptor = Object.getOwnPropertyDescriptor(Vue.$ctx, key) || {}
        const value = option[key]
        // TODO: 需要设计成只能通过特殊方法来改变，不能直接修改
        let descriptor = value?.descriptor

        if (!descriptor) {
            descriptor = { value }
        }
        Object.defineProperty(Vue.$ctx, key, { ...originDescriptor, ...descriptor })
    })
}
