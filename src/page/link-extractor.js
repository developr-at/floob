import cheerio from 'cheerio';

export default {
    extractLinks: (html) => {
        const $ = cheerio.load(html);

        var links = $('a').map((idx, obj) => { return $(obj).attr('href'); }).toArray();

        return links;
    }
};