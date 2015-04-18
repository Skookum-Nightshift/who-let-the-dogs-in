module.exports = {
    entry: './prototype.jsx',
    output: {
        path: __dirname,
        filename: 'prototype.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    }
};
