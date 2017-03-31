import webpack from 'webpack';

const ROOT_PATH = `${__dirname}/..`;
const { version } = require(`${ROOT_PATH}/package.json`);

export default {
    entry: [`${ROOT_PATH}/lib/CanalPlusWrapper.js`],

    output: {
        library: [
            'CanalPlusWrapper'
        ],
        libraryTarget: 'umd',
        path: `${ROOT_PATH}/dist`,
        filename: 'canalplus-p2p-wrapper.js',
    },

    module: {
        noParse: /node_modules\/streamroot-p2p\/p2p.js/,
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            _VERSION_: JSON.stringify(version),
            __DEV__: true,
        }),
    ]
};
