const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: 'asset/resource',
        generator: {
          // filename: 'fonts/[name]-[hash][ext][query]'
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          // Save the CSS as a separate file to allow caching
          MiniCssExtractPlugin.loader,
          {
            // Translate CSS into CommonJS modules
            loader: 'css-loader',
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  function () {
                    // eslint-disable-next-line
                    return [require('autoprefixer')];
                  },
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      jquery: 'jQuery',
    }),
    new MiniCssExtractPlugin(),
  ],
};
