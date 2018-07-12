const debug = process.env.NODE_ENV !== "production";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const uglifyJS = require('uglifyjs-webpack-plugin');

module.exports = {
    //The node object is just for a bug in webpack when bundling with electron!
    node: {
        fs: 'empty'
    },
    entry: [
        './src/index.js'
    ],
    // devtool: debug ? "inline-sourcemap" : false,
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.template.ejs',
            inject: 'body',
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new uglifyJS()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: "css-loader",
                    options: {
                        minimize: debug ? false : true
                    }
                }]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                    options: {
                        presets: ['@babel/preset-env' , '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
};