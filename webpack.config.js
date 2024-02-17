const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  console.log(env, argv, process.env.NODE_ENV, process.env.APP_ENV);

  const isEnvDevelopment = env.APP_ENV === 'dev';
  const isEnvProduction = env.APP_ENV === 'prod';

  const cssLoaders = [
    (isEnvDevelopment && 'style-loader') ||
      (isEnvProduction && MiniCssExtractPlugin.loader),
    'css-loader',
    'postcss-loader',
  ];

  return {
    // 构建目标
    target: 'browserslist',
    // 模式
    mode: 'none',
    // 入口
    entry: path.resolve(__dirname, 'src/index.js'),
    // 出口
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      clean: true,
      // publicPath: '/',
    },
    // devtool
    devtool: (isEnvDevelopment && 'source-map') || (isEnvProduction && false),
    // 解析
    resolve: {
      extensions: ['.js', '.ts'],
    },
    // DevServer
    devServer: {
      static: path.resolve(__dirname, 'public'),
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      // 分块策略
      splitChunks: {
        chunks: 'all',
      },
    },
    // 模块
    module: {
      // 规则
      rules: [
        {
          test: /\.css$/,
          use: cssLoaders,
        },
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // options: {},
          },
        },

        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // options: {},
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            toType: 'dir',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    ],
  };
};
