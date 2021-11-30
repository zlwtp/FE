window.App = async (callback = () => {}, option = {}) => {
    let app
    const { default: _app } = await import(/* webpackChunkName: "front-app" */ './main.js')
    app = _app
    await app.use(callback).start()
}
