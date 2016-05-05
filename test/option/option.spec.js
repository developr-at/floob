import { expect } from 'chai';

import Option from '../../src/option/option'

describe('Option Component', () => {

    it('should recognize --url or -u option.', (done) => {
        var url = 'http://www.google.at';
        var args = ['--url', url];
        var options = Option.parse(args);
        expect(options.url).to.equal(url);

        args = ['-u', url];
        options = Option.parse(args);
        expect(options.url).to.equal(url);

        done();
    });

});