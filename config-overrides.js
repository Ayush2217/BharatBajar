const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    os: require.resolve("os-browserify/browser"),
    url: require.resolve("url"),
    fs: false, // fs is server-side only
    net: false, // net is server-side only
    assert: require.resolve("assert"),
    util: require.resolve("util")
  };
  return config;
};
