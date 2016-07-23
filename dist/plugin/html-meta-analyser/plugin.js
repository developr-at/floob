'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://www.w3.org/TR/html5/document-metadata.html#the-meta-element
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
var recommendedTags = ['author', 'description', 'viewport'];
// https://developers.facebook.com/docs/sharing/webmasters#markup
var facebookMediaTags = ['og:url', 'og:type', 'og:title', 'og:image', 'og:description', 'og:site_name', 'og:locale', 'fb:app_id'];
// https://dev.twitter.com/cards/markup
var twitterMediaTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:creator'];

/**
 * Checks if a single tag is considered a facebook tag.
 * @param {object} tag The tag to check.
 * @return True if it is a facebook tag; False otherwise;
 */
function isFacebookTag(tag) {
    return tag.property && facebookMediaTags.indexOf(tag.property) !== -1;
}

/**
 * Checks if a single tag is considered a twitter tag.
 * @param {object} tag The tag to check.
 * @return True if it is a twitter tag; False otherwise;
 */
function isTwitterTag(tag) {
    return tag.name && twitterMediaTags.indexOf(tag.name) !== -1;
}

/**
 * Returns a list of existing meta tags from the given html source.
 * @param {string} html HTML source.
 * @returns List of meta tags.
 */
function getExistingTags($) {
    var tags = $('meta').map(function (idx, tag) {
        var $tag = $(tag);

        return {
            name: $tag.attr('name'),
            charset: $tag.attr('charset'),
            http: $tag.attr('http-equiv'),
            itemprop: $tag.attr('itemprop'),
            property: $tag.attr('property'),
            value: $tag.attr('value'),
            content: $tag.attr('content'),

            getName: function getName() {
                return this.name || this.charset || this.http || this.itemprop || this.property;
            },
            getValue: function getValue() {
                return this.value || this.content;
            }
        };
    }).toArray();

    return tags;
}

/**
 * Processes the given list of meta tags and prints out information about them.
 * @param {array} tags List of meta tags.
 * @param {object} logger Logger to use to output information about the tags.
 */
function processExistingTags(tags, logger) {
    var tagCount = tags.length;

    if (tagCount === 0) {
        logger.error('No meta tags found!');
        return;
    }

    logger.info('Found ' + tagCount + ' meta tags');
    logger.verbose('---------------------------');

    tags.forEach(function (tag) {
        logger.verbose(' - [' + tag.getName() + ']: "' + tag.getValue() + '"');
    });

    logger.verbose('---------------------------');
}

/**
 * Processes the given list of meta tags and prints out information about them.
 * @param {array} tags List of meta tags.
 * @param {object} logger Logger to use to output information about the tags.
 * @param {string} tagName Name of the given tags.
 * @param {array} recommendedTagNames List of recommended tag names.
 */
function processTags(tags, logger, tagName, recommendedTagNames) {
    // Existing tags
    if (tags.length === 0) {
        logger.info('No ' + tagName + ' found!');
        logger.verbose('---------------------------');
    } else {
        logger.info('Found ' + tags.length + ' ' + tagName);
        logger.verbose('---------------------------');
        tags.forEach(function (tag) {
            logger.verbose(' - [' + tag.getName() + ']: "' + tag.getValue() + '"');
        });
        logger.verbose('---------------------------');
    }

    // Recommended tags
    var tagNames = tags.map(function (t) {
        return t.getName();
    });
    var recommendedTags = recommendedTagNames.filter(function (t) {
        return tagNames.indexOf(t) === -1;
    });

    logger.info('Recommended ' + recommendedTags.length + ' more ' + tagName);
    logger.verbose('---------------------------');

    recommendedTags.forEach(function (tag) {
        logger.verbose(' - [' + tag + ']');
    });

    logger.verbose('---------------------------');
}

/**
 * Processes the given list of meta tags and prints out information about
 * facebook tags.
 * @param {array} tags List of meta tags.
 * @param {object} logger Logger to use to output information about the tags.
 */
function processFacebookTags(tags, logger) {
    processTags(tags.filter(isFacebookTag), logger, 'facebook meta tags', facebookMediaTags);
}

/**
 * Processes the given list of meta tags and prints out information about
 * twitter tags.
 * @param {array} tags List of meta tags.
 * @param {object} logger Logger to use to output information about the tags.
 */
function processTwitterTags(tags, logger) {
    processTags(tags.filter(isTwitterTag), logger, 'twitter meta tags', twitterMediaTags);
}

/**
 * HtmlMetaAnalyserPlugin checks existing and recommended meta tags for the
 * given html page. Outputs general information via the logger.
 */
exports.default = {

    /**
     * Name of this plugin used in logger
     * @type {string}
     */
    name: 'HTML Meta Analyser',

    /**
     * Processes a single html page and outputs information about meta tags.
     * @param {object} data jQuery object containing the html source.
     * @param {object} logger Target to output information.
     */
    process: function process(data, logger) {
        var metaTags = getExistingTags(data.data);
        processExistingTags(metaTags, logger);
        processFacebookTags(metaTags, logger);
        processTwitterTags(metaTags, logger);
    }
};