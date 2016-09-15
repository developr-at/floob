import { expect } from 'chai';
import { getCookieString } from '../../src/util/cookie-helper';

describe('Cookie Helper', () => {
    it('should be able to convert invalid/empty object to cookie string', () => {
    	expect(getCookieString()).to.equal("");
    	expect(getCookieString(undefined)).to.equal("");
    	expect(getCookieString(null)).to.equal("");
    	expect(getCookieString({})).to.equal("");
    	expect(getCookieString([])).to.equal("");
    });

    it('should be able to convert simple objects to cookie string', () => {
    	expect(getCookieString({ 'test': '1234' })).to.equal("test=1234; ");
    	expect(getCookieString({ 'test': '1234', 'a': 1, 'b': 2 })).to.equal("test=1234; a=1; b=2; ");
    });
});