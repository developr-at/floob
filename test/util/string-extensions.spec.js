import { expect } from 'chai';
import { format } from '../../src/util/string-extensions';

describe('String Extensions', () => {
    it('should have a format method', () => {
        expect(format).to.exist;
        expect(String.prototype.format).to.exist;
    });

    it('should replace a single value', () => {
        const result = format.call("{0}", 123);
        expect(result).to.equal("123");
    });

    it('should replace a multiple unique values', () => {
        const result = format.call("{0}-{1}", 123, "abc");
        expect(result).to.equal("123-abc");
    });

    it('should replace a multiple values with multiple occurences', () => {
        const result = format.call("{1}-{0}{0}-{1}", 123, "abc");
        expect(result).to.equal("abc-123123-abc");
    });
});