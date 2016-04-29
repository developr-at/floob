import { assert, expect } from 'chai';

import PageLinkExtractor from '../../src/page/link-extractor.js';

describe('PageLinkExtractor Component', () => {
    it('should find no links on empty document', () => {
        const html = '<html><body></body></html>';
        const links = PageLinkExtractor.extractLinks(html);

        expect(links).to.be.empty;
    });

    it('should find exactly one link', () => {
        const html = '<html><body><a href="http://www.url.com" /></body></html>';
        const links = PageLinkExtractor.extractLinks(html);

        expect(links).to.have.length(1);
        expect(links[0]).to.equal('http://www.url.com');
    });

    it('should find multiple links', () => {
        const html = '<html><body><a href="http://www.url.com" /><div><a href="http://www.url2.com">Second link</a></div><h1><a href="http://www.url.com" /></h1></body></html>';
        const links = PageLinkExtractor.extractLinks(html);

        expect(links).to.have.length(3);
        expect(links[0]).to.equal('http://www.url.com');
        expect(links[1]).to.equal('http://www.url2.com');
        expect(links[2]).to.equal('http://www.url.com');
    });
});