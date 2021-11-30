window.App(async({ Vue }) => {
    Vue.$ctx.router.addRoutes(require('./router').default)
}, { noauth: true })
