const webpack = require('webpack');
const { override, addWebpackPlugin } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ),
  (config) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util"),
      "fs": false,
      "net": false,
      "tls": false,
    });
    config.resolve.fallback = fallback;
    
    // Add alias to correctly resolve 'process/browser'
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'process/browser.js': path.resolve(__dirname, 'node_modules/process/browser.js'),
    };
    
    return config;
  },
);