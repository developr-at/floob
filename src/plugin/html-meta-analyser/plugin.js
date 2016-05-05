import cheerio from 'cheerio';
import { format } from '../../util/string-extensions';

// https://www.w3.org/TR/html5/document-metadata.html#the-meta-element
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
const recommendedTags = [ 'author', 'description', 'viewport' ];
// https://developers.facebook.com/docs/sharing/webmasters#markup
const facebookMediaTags = [ 'og:url', 'og:type', 'og:title', 'og:image', 'og:description', 'og:site_name', 'fb:app_id' ];
// https://dev.twitter.com/cards/markup
const twitterMediaTags = [ 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:creator' ];

function processExistingMetaTags($, $metaTags, output) {
    const existingTags = $metaTags.map((idx, tag) => {
        return {
            name: $(tag).attr('name'),
            property: $(tag).attr('property'),
            value: $(tag).attr('value'),
        };
    }).toArray();

    const tagCount = existingTags.length;
    const tagNames = existingTags.map((t) => t.name).join(', ');

    output('Found {0} tags: {1}'.format(tagCount, tagNames));
}

export default {
    process: (data, output) => {
        const $ = data;
        const $metaTags = $('meta');

        processExistingMetaTags($, $metaTags, output);
    }
};