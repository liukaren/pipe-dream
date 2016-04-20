// This config is not used directly, but rather as a base for building the
// development and prod configs.

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'), // where the static JS output file goes
        publicPath: '/public/' // where the JS is accessible on the dev server
    },

    resolve: {
        root: path.resolve('src'),
        extensions: ['', '.js', '.jsx'] // when importing/requiring, check these extensions
    },

    plugins: [],

    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loaders: ['eslint'],
            include: path.join(__dirname, 'src')
        }],

        loaders: [{
            test: [/\.svg$/, /\.png$/],
            loader: 'url'
        }]
    },

    postcss: function () {
        return [autoprefixer]; // configure postcss to just add browser prefixes
    }
};
