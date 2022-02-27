const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    entry: `./src/index.ts`,
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'sass-loader',
              options: {
                // use dart-sass
                implementation: require('sass'),
                sourceMap: isDevelopment
              }
            }
          ],
        },
      ],
    },
    devtool: isDevelopment ? 'source-map' : false,
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin()
    ]
  };
};
