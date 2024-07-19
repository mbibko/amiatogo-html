const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const SITE = process.env.SITE || 'true';
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

let config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/main.js",
        publicPath: SITE == "true" ? "../" : "",
        assetModuleFilename: 'images/[path][name][ext]'
    },
    // externals: {
    //   tns: 'tns'
    // },
    mode: NODE_ENV,
    devtool: NODE_ENV == "development" ? "source-map" : "source-map",
    devServer: {
        hot: isDevServer ? true : false,
        host: "0.0.0.0",
    },
    resolve: {
        alias: {
            'sass': path.resolve(__dirname, 'src/sass'),
            'images': path.resolve(__dirname, 'src/media')
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: path.resolve(__dirname, 'src/media/sprite-images'),
                type: 'javascript/auto'
                // options: {
                //   esModule: false,
                //   extract: false,
                // }
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env"]
                        ],
                    }
                }
            },
            {
                test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
                exclude: path.resolve(__dirname, 'src/media/sprite-images'),
                use: [
                    'svg-transform-loader'
                ],
                type: 'asset/inline'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {loader: 'css-loader', options: {importLoaders: 1}},
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // "style-loader",
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|woff|woff2|gif|mp4)$/,
                type: "asset/resource"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            sources: {
                                list: [
                                  "...",
                                    {
                                        tag: "img",
                                        attribute: "data-src",
                                        type: "src",
                                    },
                                    {
                                        tag: "link",
                                        attribute: "href",
                                        type: "src",
                                        filter: () => false,
                                    },
                                    {
                                        tag: "script",
                                        attribute: "src",
                                        type: "src",
                                        filter: () => false,
                                    },
                                ]
                                // 'img:src', ':srcset', ':data-src', 'source:src', 'video:src'
                            }
                        }
                    },
                    {
                        loader: path.resolve("./loaders/nunjucks-loader.js"),
                        options: {
                            searchPaths: ["./src/layouts", "./src/components"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new SpriteLoaderPlugin(),
        // new webpack.ProvidePlugin({
        //   tns: 'tiny-slider/src/tiny-slider'
        // }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            SITE: JSON.stringify(SITE)
        }),
        new MiniCssExtractPlugin({
            filename: SITE == "true" ? "css/[name].css" : "[name].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(generateHtmlPlugins('./src/html'))
};

module.exports = (env, argv) => {
    if (SITE == 'false') {
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/js/dinamic-links.js', to: './js' },
                    { from: './src/ajax.pages_list.php', to: '.' },
                ]
            }),
        )
    }
    return config;
};

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        return new HtmlWebpackPlugin({
            path: path.resolve(__dirname, './dist'),
            filename: `${parts[0]}.html`,
            template: `./src/html/${parts[0]}.html`,
            inject: false,
        })
    })
}
