'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LinkExtractor is responsible for extracting links from HTML.
 */
exports.default = {
  /**
   * Tries to extract all links from the given html document.
   * @param {string} html HTML markup to extract the links from.
   * @return Array of links found in the given markup.
   */
  extractLinks: function extractLinks(html) {
    var $ = _cheerio2.default.load(html);

    var links = $('a').map(function (idx, obj) {
      return $(obj).attr('href');
    }).toArray();

    return links;
  }
};