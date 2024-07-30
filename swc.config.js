module.exports = {
    jsc: {
        parser: {
            syntax: 'ecmascript',
            jsx: true,
            dynamicImport: true
        },
        transform: {
            react: {
                runtime: 'automatic'
            },
            optimizer: {
                globals: {
                    vars: {
                        'process.env.NODE_ENV': '"development"'
                    }
                }
            }
        },
        target: 'es2015'
    },
    module: {
        type: 'commonjs'
    }
};