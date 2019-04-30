const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    // publicPath: "/"
  },
  mode: NODE_ENV,
  devtool: NODE_ENV == "development" ? "source-map" : "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    hot: true,
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
  module: {
    rules: [
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
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: ["src/components", "src/sass"]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|woff|woff2|gif)$/,
        loader: "file-loader",
        options: {
          context: "src",
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: []
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
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(generateHtmlPlugins('./src/html'))
};

module.exports = (env, argv) => {
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
