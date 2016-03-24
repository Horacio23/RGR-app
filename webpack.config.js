var options = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  // Loaders: We will preprocess files before bundling them
  module: {
    // Array of loaders
    loaders: [
      // test: anything that ends in .js
      // I was getting errors so I had to do: npm install babel-preset-react and add a query here
      { test: /\.js$/, loader: 'babel-loader', query:{presets:['react', 'es2015']} }
    ]
  }
}

module.exports = options
