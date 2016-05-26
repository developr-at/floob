import { expect } from 'chai';
import { extractDomain, haveSameDomain, isAbsoluteUrl } from '../../src/util/url-helper';

describe('URL Helper', () => {
    it('should be able to handle an empty string', () => {
        expect(extractDomain('')).to.equal('');
    });

    it('should be able to extract the domain from an URL', () => {
        expect(extractDomain('www.google.com/some/sub/domain/file.txt')).to.equal('www.google.com');
        expect(extractDomain('http://stackoverflow.com/a/23945027/733368')).to.equal('stackoverflow.com');
        expect(extractDomain('http://www.test.at/123')).to.equal('www.test.at');
    });

    it('should be able to compare domains', () => {
        expect(haveSameDomain('https://www.google.com/webhp?q=test', 'http://www.google.com')).to.be.true;
        expect(haveSameDomain('www.test.at', 'test.at')).to.be.false;
    });

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