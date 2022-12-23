var path = require("path");
var webpack = require("webpack");
var ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: "./src/main.js",
  output: {
    publicPath: ASSET_PATH,
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: "127.0.0.1",
    proxy: {}
  },
  performance: {
    hints: false
  },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "src/sw.js")
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "static"),
        to: "static"
      }
    ])
  ],
  devtool: "#cheap-eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#cheap-source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
