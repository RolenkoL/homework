module.exports = {
  mode: "development",
  devtool: "(none)",
  entry: "./src/index.js",

  devServer: {
    proxy: {
      '/api': 'http://localhost:8089'
    }
  }

};