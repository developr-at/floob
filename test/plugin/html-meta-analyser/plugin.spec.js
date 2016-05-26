import cheerio from 'cheerio';
import sinon from 'sinon';
import { expect } from 'chai';

import HtmlMetaAnalyserPlugin from '../../../src/plugin/html-meta-analyser/plugin';

describe('HtmlMetaAnalyser Plugin', () => {
    // it('should test', () => {
    //     const $ = cheerio.load('<html><head><meta name="author" value="blub" /><meta name="description" value="desc123" /></head></html>');
    //     const output = sinon.spy();

    //     HtmlMetaAnalyserPlugin.process($, output);

    //     expect(output.calledOnce).to.be.true;
    //     expect(output.firstCall.calledWith("Found 2 tags: author, description")).to.be.true;
    // });
});