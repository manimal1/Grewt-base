const path = require('path');

module.exports = () => ({
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname + '/dist/client'),
    // proxy allows for same origin use of this server with api server
    proxy: {
      "/api": "http://localhost:5000"
    },
    port: 4000,
    hot: true
  }
});
