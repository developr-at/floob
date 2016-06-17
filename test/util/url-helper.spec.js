import { expect } from 'chai';
import { extractDomain, haveSameDomain, isAbsoluteUrl } from '../../src/util/url-helper';

describe('URL Helper', () => {
    it('should recognize relative urls', () => {
        expect(isAbsoluteUrl('/post/1234')).to.be.false;
        expect(isAbsoluteUrl('test/page/123')).to.be.false;
    })

    it('should recognize absolute urls', () => {
        expect(isAbsoluteUrl('http://www.google.com')).to.be.true;
        expect(isAbsoluteUrl('https://www.google.com')).to.be.true;
        expect(isAbsoluteUrl('ftp://whatever.com')).to.be.true;
    })
});