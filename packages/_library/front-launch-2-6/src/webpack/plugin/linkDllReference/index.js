/*
 *MIT License http://www.opensource.org/licenses/mit-license.php
 *Author Tobias Koppers @sokra
 */
'use strict'

const DelegatedSourceDependency = require('webpack/lib/dependencies/DelegatedSourceDependency')
const DelegatedModuleFactoryPlugin = require('./DelegatedModuleFactoryPlugin')
const ExternalModuleFactoryPlugin = require('webpack/lib/ExternalModuleFactoryPlugin')
const DelegatedExportsDependency = require('webpack/lib/dependencies/DelegatedExportsDependency')
const NullFactory = require('webpack/lib/NullFactory')

const validateOptions = require('schema-utils')
const schema = require('webpack/schemas/plugins/DllReferencePlugin.json')

class DllReferencePlugin {
    constructor(options) {
        validateOptions(schema, options, 'Dll Reference Plugin')
        this.options = options
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            'DllReferencePlugin',
            (compilation, { normalModuleFactory }) => {
                compilation.dependencyFactories.set(
                    DelegatedSourceDependency,
                    normalModuleFactory
                )
                compilation.dependencyFactories.set(
                    DelegatedExportsDependency,
                    new NullFactory()
                )
            }
        )

        compiler.hooks.beforeCompile.tapAsync(
            'DllReferencePlugin',
            (params, callback) => {
                const manifest = this.options.manifest
                if (typeof manifest === 'string') {
                    params.compilationDependencies.add(manifest)
                    compiler.inputFileSystem.readFile(manifest, (err, result) => {
                        if (err) return callback(err)
                        params[`dll reference ${manifest}`] = JSON.parse(result.toString('utf-8'))
                        return callback()
                    })
                } else {
                    return callback()
                }
            }
        )

        compiler.hooks.compile.tap('DllReferencePlugin', params => {
            let manifest = this.options.manifest
            if (typeof manifest === 'string') {
                manifest = params[`dll reference ${manifest}`]
            }
            const name = this.options.name || manifest.name
            const sourceType = this.options.sourceType || manifest && manifest.type || 'var'
            const externals = {}
            const source = `dll-reference ${name}`
            externals[source] = name
            const normalModuleFactory = params.normalModuleFactory
            new ExternalModuleFactoryPlugin(sourceType, externals).apply(normalModuleFactory)
            new DelegatedModuleFactoryPlugin({
                source,
                type: this.options.type,
                scope: this.options.scope,
                context: this.options.context || compiler.options.context,
                content: this.options.content || manifest.content,
                extensions: this.options.extensions
            }).apply(normalModuleFactory)
        })
    }
}

module.exports = DllReferencePlugin
