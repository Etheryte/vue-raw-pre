const RewritingStream = require("parse5-html-rewriting-stream");
const stripIndent = require("strip-indent");

const { trimLeadingAndTrailing } = require("./util");

/**
 * Cleanup handles a number of core features:
 *  - trim leading and trailing empty lines unless disabled
 *  - dedent code unless disabled
 *  - replace custom tags with <pre><code>
 */
module.exports = function getCleanupRewriter(targetTagName) {
  const rewriter = new RewritingStream();

  let shouldTrim = false;
  let shouldDedent = false;

  rewriter.on("startTag", (node, raw) => {
    if (node.tagName !== targetTagName) {
      rewriter.emitRaw(raw);
      return;
    }

    shouldTrim = !(
      node.attrs && node.attrs.some((attr) => attr.name === "no-trim")
    );
    shouldDedent = !(
      node.attrs && node.attrs.some((attr) => attr.name === "no-dedent")
    );

    // Switch the tag over to <pre><code>
    node.tagName = "pre";
    rewriter.emitStartTag(node);
    if (!node.selfClosing) {
      rewriter.emitStartTag({
        attrs: [],
        tagName: "code",
        selfClosing: false,
      });
    }
  });

  rewriter.on("text", (node, raw) => {
    if (!shouldTrim && !shouldDedent) {
      rewriter.emitRaw(raw);
      return;
    }

    let content = raw;
    if (shouldTrim) {
      content = trimLeadingAndTrailing(content);
    }
    // TODO: Do we need to do these before escaping?
    if (shouldDedent) {
      content = stripIndent(content);
    }

    rewriter.emitRaw(content);
  });

  rewriter.on("endTag", (node, raw) => {
    if (node.tagName !== targetTagName) {
      rewriter.emitRaw(raw);
      return;
    }

    // Reset to initial values
    shouldTrim = false;
    shouldDedent = false;

    // Close off with a </code></pre>
    node.tagName = "pre";
    rewriter.emitEndTag({
      attrs: [],
      tagName: "code",
      selfClosing: false,
    });
    rewriter.emitEndTag(node);
  });

  return rewriter;
};
