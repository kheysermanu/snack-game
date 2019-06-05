const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const settings = {
  distPath: path.join(__dirname, "dist"),
  srcPath: path.join(__dirname, "src"),
  publicPath: path.join(__dirname, "public"),
  rootPath: path.resolve("./")
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath)
};

const config = {
  entry: './src/index.tsx',
  output: {
    path: settings.distPath,
    filename: "bundle.js"
  },
  resolve: {
    /*alias: {
      "@material-ui/styles": path.resolve(settings.rootPath, "node_modules", "@material-ui/styles"),
    },*/
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js'],
        logLevel: 'INFO',
        baseUrl: settings.srcPath,
        mainFields: ['browser', 'main'],
      }),
    ],
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
      test: /\.ts|\.tsx$/,
      use: ['awesome-typescript-loader', 'tslint-loader'],
      include: __dirname
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',// creates style nodes from JS strings
        use: [
          'css-loader',// translates CSS into CommonJS
          'sass-loader',// compiles Sass to CSS, using Node Sass by default
        ],
      })
    },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    },
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: "assets/"
          }
        }
      ]
    }
    ]
  },
  /*externals: {
     "react": "react",
     "react-dom": "react-dom"
  },*/
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextWebpackPlugin("styles.css"),
    new webpack.ProvidePlugin({
      "React": "react",
      "ReactDOM": "react-dom"
    }),
    new HtmlWebpackPlugin({
      title: 'Getting Started with Typescript and ReactJS',
      template: srcPathExtend("index.html")
    })
  ],
  devServer: {
    contentBase: settings.srcPath,
    historyApiFallback: true,
    compress: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map"
};

module.exports = config;
