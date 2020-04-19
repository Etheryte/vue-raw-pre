module.exports = function applyLoader(chainableWebpackConfig) {
  return chainableWebpackConfig.module
    .rule("vue")
    .use("vue-raw-pre-loader")
    .loader(path.resolve(__dirname, "src/loader.js"))
    .end();
};
