module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./app.js",
    html: "./index.html",
  },
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react&presets[]=es2015',
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },
}