const RewritingStream = require("parse5-html-rewriting-stream");
const { escapeHtmlAndMustaches } = require("./util");

/**
 * Identify any target tags and escape their contents: nested tags, text and mustache templates
 */
module.exports = function getEscapeRewriter(targetTagName) {
  const rewriter = new RewritingStream();

  // Do we need to escape any subsequent tags and text we encounter?
  let shouldEscape = false;

  rewriter.on("startTag", (node, raw) => {
    const content = shouldEscape ? escapeHtmlAndMustaches(raw) : raw;

    if (node.tagName === targetTagName && !node.selfClosing) {
      shouldEscape = true;
    }
    rewriter.emitRaw(content);
  });

  rewriter.on("text", (node, raw) => {
    const content = shouldEscape ? escapeHtmlAndMustaches(raw) : raw;
    rewriter.emitRaw(content);
  });

  rewriter.on("endTag", (node, raw) => {
    if (node.tagName === targetTagName) {
      // This was a closing tag for us, no further escaping is necessary
      shouldEscape = false;
    }

    const content = shouldEscape ? escapeHtmlAndMustaches(raw) : raw;
    rewriter.emitRaw(content);
  });

  return rewriter;
};
