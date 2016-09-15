import { expect } from 'chai';
import extend from 'extend';
import cheerio from 'cheerio';

describe('Sanity Check dependencies', () => {
    describe('extend', () => {
        it('should be able to combine two objects', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { c: 3, d: 4 };

            const result = extend({}, obj1, obj2);
            expect(result).to.deep.equal({ a: 1, b: 2, c: 3, d: 4 });
        });

        it('should be able to combine two objects and overwrite properties', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 4, c: 5 };

            const result = extend({}, obj1, obj2);
            expect(result).to.deep.equal({ a: 1, b: 4, c: 5 });
        });
    });

    describe('cheerio', () => {
        it('should be able to parse basic html', () => {
            const html = '<html><body><a href="test.html">Link 1</a></body></html>';
            const $ = cheerio.load(html);

            expect($('a')).to.be.of.length(1);

            const link = $('a').first();
            expect(link.attr('href')).to.equal('test.html');
        });
    });
});