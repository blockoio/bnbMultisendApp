/* global __dirname */

var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, '../js');
var dir_html = path.resolve(__dirname, '../html');
var dir_css = path.resolve(__dirname, '../css');
var dir_build = path.resolve(__dirname, '../build');

module.exports = {
    entry: {
        main: path.resolve(dir_js, 'main.js')
    },
    output: {
        path: dir_build,
        filename: '[name].js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        rules: [
            {
                test: dir_js,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    }
                ]

            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html }, // to: output.path
            { from: dir_css }
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};
