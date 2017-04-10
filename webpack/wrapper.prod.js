const webpack = require('webpack');
const prodConfig = require('./wrapper.dev');

module.exports = Object.assign(prodConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            mangle: true,
        }),
    ]
});
