// See https://stackoverflow.com/a/6234804/1470607
function escapeHtmlAndMustaches(unsafe) {
  return (
    (unsafe || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      // For Vue templates, we need to break opening mustaches to avoid them being replaced
      .replace(/{{/g, "{<template></template>{")
  );
}

function trimUntilText(result, line) {
  if (result.length || line.trim().length) {
    result.push(line);
  }
  return result;
}

// Trim both leading and trailing empty lines but leave empty lines within code intact
function trimLeadingAndTrailing(input) {
  const lines = (input || "").split(/\r?\n/);

  const trimmed = lines
    .reduceRight(trimUntilText, [])
    .reduceRight(trimUntilText, []);
  return trimmed.join("\n");
}

module.exports = {
  escapeHtmlAndMustaches,
  trimLeadingAndTrailing,
};
