import { expect } from 'chai';
import request from 'request';
import sinon from 'sinon';

import PageFetcher from '../../src/page/fetcher.js';

describe('PageFetcher Component', () => {

    before((done) => {
        sinon.stub(request, 'get');
        done();
    });

    afterEach((done) => {
        request.get.reset();
        done();
    })

    after((done) => {
        request.get.restore();
        done();
    });

    it('should return a PageResult on Success.', (done) => {
        const url = 'http://www.success.com';

        request.get
            .yields(null, { statusCode: 200 }, '<html><body><h1>Test</h1></body></html>');

        const pageFetcher = PageFetcher.create();
        pageFetcher.fetch(url, (pageResult) => {
            expect(request.get.calledOnce).to.be.true;
            expect(pageResult).not.to.be.null;

            expect(pageResult.url).to.exist;
            expect(pageResult.url).to.equal(url);

            expect(pageResult.status).to.exist;
            expect(pageResult.status).to.equal(200);

            expect(pageResult.raw).to.exist;
            expect(pageResult.raw).to.equal('<html><body><h1>Test</h1></body></html>');

            expect(pageResult.data).to.exist;
            expect(pageResult.data).to.be.a('function');
            done();
        });
    });

    it('should return an ErrorResult on Failure', (done) => {
        const url = 'http://www.failure.com';

        request.get
            .yields(new Error('getaddrinfo ENOTFOUND'), undefined, undefined);

        const pageFetcher = PageFetcher.create();
        pageFetcher.fetch(url, (pageResult) => {
            expect(request.get.calledOnce).to.be.true;
            expect(pageResult).not.to.be.null;

            expect(pageResult.url).to.exist;
            expect(pageResult.url).to.equal(url);

            expect(pageResult.status).to.exist;
            expect(pageResult.status).to.equal(-1);

            expect(pageResult.raw).to.exist;
            expect(pageResult.raw).to.be.a('error');

            expect(pageResult.data).to.be.undefined;
            done();
        });
    });
});