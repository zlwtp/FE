class HttpError extends Error {
    constructor(message, type, extra, status) {
        super(message)

        this.msg = message
        this.type = type
        this.extra = extra || {}
        this.status = status || 500
    }

    toJSON() {
        return {
            msg: this.msg,
            type: this.type,
            status: this.status,
            extra: this.extra
        }
    }
}

class BadRequest extends HttpError {
    constructor(obj) {
        const {message = 'BadRequest', type = 'BadRequest', extra = null} = obj || {}
        super(message, type, extra, 400)
    }
}

class Unauthorized extends HttpError {
    constructor(obj) {
        const {message = 'Unauthorized', type = 'Unauthorized', extra = null} = obj || {}
        super(message, type, extra, 401)
    }
}

class Forbidden extends HttpError {
    constructor(obj) {
        const {message = 'Forbidden', type = 'Forbidden', extra = null} = obj || {}
        super(message, type, extra, 403)
    }
}

class NotFound extends HttpError {
    constructor(obj) {
        const {message = 'NotFound', type = 'NotFound', extra = null} = obj || {}
        super(message, type, extra, 404)
    }
}

class SystemError extends HttpError {
    constructor(obj) {
        const {message = '服务器开小差了...', type = 'SystemError', extra = null} = obj || {}
        super(message, type, extra, 500)
    }
}

class BadGateway extends HttpError {
    constructor(obj) {
        const {message = 'BadGateway', type = 'BadGateway', extra = null} = obj || {}
        super(message, type, extra, 502)
    }
}

module.exports = {
    HttpError,
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    SystemError,
    BadGateway
}
