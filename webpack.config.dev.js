var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.common.js');

module.exports = Object.assign(baseConfig, {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ].concat(baseConfig.plugins),

    module: Object.assign(baseConfig.module, {
        loaders: [{
            // hot loading + ES2015 syntax for .js and .jsx files
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            // interpret LESS files (scope into modules, add browser prefixes)
            // set a verbose localIdentName for more debuggable CSS classes
            test: /\.less$/,
            loader: "style!css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less",
            include: path.join(__dirname, 'src')
        }].concat(baseConfig.module.loaders)
    })
});
