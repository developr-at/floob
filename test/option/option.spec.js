import { expect } from 'chai';

import Option from '../../src/option/option'

describe('Option Component', () => {

    it('should recognize --url or -u option.', () => {
        const url = 'http://www.google.at';

        let options = Option.parse(['--url', url]);
        expect(options.url).to.equal(url);

        options = Option.parse(['-u', url]);
        expect(options.url).to.equal(url);
    });

    it('should recognize --help or -h option.', () => {
        let options = Option.parse(['--help']);
        expect(options.help).to.be.true;

        // options = Option.parse([]);
        // expect(options.help).to.be.false;

        options = Option.parse(['-h']);
        expect(options.help).to.be.true;
    });

    it('should recognize --config or -c option.', () => {
        const configPath = 'dummy';

        let options = Option.parse(['--config', configPath]);
        expect(options.config).to.equal(configPath);

        options = Option.parse(['-c', configPath]);
        expect(options.config).to.equal(configPath);
    });
});