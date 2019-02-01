const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require("path");

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/monorepo/'
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    symlinks: false,
  },
  devServer: {
    port: 8080,
    publicPath: '/monorepo'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'app0/index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'app1/index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'app2-npm/index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'app3-npm/index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'app4-npm/index.html',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/monorepo/'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          }
        ]
      }
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      chunks: 'all',
    },
  },
};
