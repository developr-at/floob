"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAbsoluteUrl = isAbsoluteUrl;
/**
 * Check if a given url is an absolute url (with protocol).
 * Source: http://stackoverflow.com/a/10687137/733368
 * @param {string} url The url to check.
 * @return True if the url is absolute (has a protocol); False otherwise.
 */
function isAbsoluteUrl(url) {
  var absoluteRegEx = /^(?:[a-z]+:)?\/\//i;
  return absoluteRegEx.test(url);
}