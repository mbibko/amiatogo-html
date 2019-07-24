const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
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
    },
    // externals: {
    //   tns: 'tns'
    // },
    mode: NODE_ENV,
    devtool: NODE_ENV == "development" ? "source-map" : "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        overlay: true,
        hot: isDevServer ? true : false,
        watchContentBase: true,
        host: "0.0.0.0",
        stats: {
            all: false,
            modules: true,
            maxModules: 0,
            errors: true,
            warnings: true,
            moduleTrace: true,
            errorDetails: true
        }
    },
    resolve: {
        alias: {
            'images': path.resolve(__dirname, 'src/media')
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: path.resolve(__dirname, 'src/media/sprite-images'),
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
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: "[path][name].[ext]"
                        }
                    },
                    'svg-transform-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: NODE_ENV == 'development',
                            reloadAll: true,
                        },
                    },
                    {loader: 'css-loader', options: {importLoaders: 1}},
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: NODE_ENV == 'development',
                            reloadAll: true,
                        },
                    },
                    // "style-loader",
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["src/components", "src/sass"]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|woff|woff2|gif|mp4)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            fallback: 'file-loader',
                            limit: 8192,
                            context: "src",
                            outputPath: (url) => {
                                if (/components/.test(url)) {
                                    return `media/${url}`;
                                }

                                return url;
                            },
                            name: "[path][name].[ext]"
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: NODE_ENV == 'development'
                        },
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: false,
                            attrs: ['img:src', ':data-src', 'source:src', 'video:src']
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
            new CopyWebpackPlugin([
                { from: './src/js/dinamic-links.js', to: './js' },
                { from: './src/ajax.pages_list.php', to: '.' },
            ]),
        )
    }
    return config;
};

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        return new HtmlWebpackPlugin({
            filename: `${parts[0]}.html`,
            template: `./src/html/${parts[0]}.html`,
            inject: false,
        })
    })
}
