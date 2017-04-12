const webpack = require('webpack');
const prodConfig = require('./wrapper.dev');

prodConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        mangle: true,
    })
);

module.exports = prodConfig;
