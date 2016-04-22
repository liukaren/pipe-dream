// Development server with webpack hot loading.
// See here for more details:
// https://gaearon.github.io/react-hot-loader/getstarted/

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) { return console.log(err); }
    console.log('Listening at http://localhost:3000/');
});
