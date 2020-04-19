const { Duplex } = require("stream");

const getEscapeRewriter = require("./escapeRewriter");
const getCleanupRewriter = require("./cleanupRewriter");

module.exports = async function vueTemplateExampleLoader(source, map, meta) {
  const targetTagName = "v-raw-pre";

  // If this file contains no targets, return unaltered
  if (source.indexOf(targetTagName) === -1) {
    return source;
  }

  // See https://webpack.js.org/api/loaders/#asynchronous-loaders
  const resolveLoader = this.async();
  const chunks = [];
  const escapeRewriter = getEscapeRewriter(targetTagName);
  const cleanupRewriter = getCleanupRewriter(targetTagName);

  /**
   * We need to do two passes over the source:
   *  - escape the content of all target tags
   *  - apply trim and dedent to the resulting mergers where necessary + tag cleanup
   */
  const stream = Duplex.from(source).pipe(escapeRewriter).pipe(cleanupRewriter);
  stream.on("data", (chunk) => chunks.push(chunk));
  stream.on("error", (error) => resolveLoader(error));
  stream.on("end", () => {
    // Would be nice if this was an array of Buffers instead but maybe someday
    const combined = chunks.join("");
    resolveLoader(null, combined, map, meta);
  });
};
