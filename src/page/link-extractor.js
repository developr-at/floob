import cheerio from 'cheerio';

/**
 * LinkExtractor is responsible for extracting links from HTML.
 */
export default {
    /**
     * Tries to extract all links from the given html document.
     * @param {string} html HTML markup to extract the links from.
     * @return Array of links found in the given markup.
     */
    extractLinks: (html) => {
        const $ = cheerio.load(html);

        var links = $('a').map((idx, obj) => { return $(obj).attr('href'); }).toArray();

        return links;
    }
};