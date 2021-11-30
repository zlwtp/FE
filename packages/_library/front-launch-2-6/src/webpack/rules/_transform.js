module.exports = function(css) {
    return window.getSkinStyle ? window.getSkinStyle(css) : css
}
