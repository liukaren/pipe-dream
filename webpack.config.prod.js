var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.common.js');

module.exports = Object.assign(baseConfig, {
    entry: [
        'babel-polyfill',
        './src/index.jsx'
    ],

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ].concat(baseConfig.plugins),

    module: Object.assign(baseConfig.module, {
        loaders: [{
            // ES2015 syntax for .js and .jsx files
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            // interpret LESS files (scope into modules, add browser prefixes)
            test: /\.less$/,
            loader: "style!css?modules&importLoaders=2&localIdentName=[hash:base64:5]!postcss!less",
            include: path.join(__dirname, 'src')
        }].concat(baseConfig.module.loaders)
    })
});
