module.exports = {
  mode: "development",
  devtool: "(none)",
  entry: "./src/board.js",

  devServer: {
    proxy: {
      '/api': 'http://localhost:8089'
    }
  }

};