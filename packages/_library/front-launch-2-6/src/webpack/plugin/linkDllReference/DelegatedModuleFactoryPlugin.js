/*
 *MIT License http://www.opensource.org/licenses/mit-license.php
 *Author Tobias Koppers @sokra
 */
'use strict'

const DelegatedModule = require('webpack/lib/DelegatedModule')

/*
 * Options.source
 * options.type
 * options.context
 * options.scope
 * options.content
 */
class DelegatedModuleFactoryPlugin {
    constructor(options) {
        this.options = options
        options.type = options.type || 'require'
        options.extensions = options.extensions || [
            '',
            '.js'
        ]
    }

    apply(normalModuleFactory) {
        const scope = this.options.scope
        if (scope) {
            normalModuleFactory.hooks.factory.tap(
                'DelegatedModuleFactoryPlugin',
                factory => (data, callback) => {
                    const dependency = data.dependencies[0]
                    const request = dependency.request
                    if (request && request.indexOf(`${scope}/`) === 0) {
                        const innerRequest = `.${request.substr(scope.length)}`
                        let resolved
                        if (innerRequest in this.options.content) {
                            resolved = this.options.content[innerRequest]
                            return callback(
                                null,
                                new DelegatedModule(
                                    this.options.source,
                                    resolved,
                                    this.options.type,
                                    innerRequest,
                                    request
                                )
                            )
                        }
                        for (let i = 0; i < this.options.extensions.length; i++) {
                            const extension = this.options.extensions[i]
                            const requestPlusExt = innerRequest + extension
                            if (requestPlusExt in this.options.content) {
                                resolved = this.options.content[requestPlusExt]
                                return callback(
                                    null,
                                    new DelegatedModule(
                                        this.options.source,
                                        resolved,
                                        this.options.type,
                                        requestPlusExt,
                                        request + extension
                                    )
                                )
                            }
                        }
                    }
                    return factory(data, callback)
                }
            )
        } else {
            normalModuleFactory.hooks.module.tap(
                'DelegatedModuleFactoryPlugin',
                module => {
                    if (module.libIdent) {

                        /*
                         * Const request = module.libIdent(this.options)
                         * const index = request.lastIndexOf('node_modules')
                         * const str = request.substring(index)
                         * if (str && str in this.options.content) {
                         *     const resolved = this.options.content[str]
                         *     return new DelegatedModule(this.options.source, resolved, this.options.type, request, module)
                         * }
                         */

                        const request = module.libIdent(this.options)
                        const node_modules_index = request.lastIndexOf('node_modules')
                        const res_index = request.lastIndexOf('./')
                        const index = res_index > node_modules_index ? res_index : node_modules_index
                        const str = request.substring(index)

                        for (const key in this.options.content) {
                            if (key.includes(str)) {
                                const resolved = this.options.content[key]
                                return new DelegatedModule(this.options.source, resolved, this.options.type, request, module)
                            }
                        }
                    }
                    return module
                }
            )
        }
    }
}
module.exports = DelegatedModuleFactoryPlugin
