import { expect } from 'chai';

import PageQueue from '../../src/page/queue.js';

describe('PageQueue Component', () => {
    it('should be able to add new urls to the queue', () => {
        expect(PageQueue.urlsToProcess).to.exist;
        expect(PageQueue.urlsToProcess).to.be.empty;

        PageQueue.enqueue("http://www.test.at");

        expect(PageQueue.urlsToProcess).to.have.lengthOf(1);
    });

    it('should be able to clear the queue', () => {
        // hmm issue with preceeding test... maybe change the way we use the queue.
        PageQueue.clear();

        expect(PageQueue.urlsToProcess).to.be.empty;

        PageQueue.enqueue("http://www.test1.at");
        PageQueue.enqueue("http://www.test2.at");
        PageQueue.enqueue("http://www.test3.at");

        expect(PageQueue.urlsToProcess).to.have.lengthOf(3);

        PageQueue.clear();

        expect(PageQueue.urlsToProcess).to.be.empty;
    });

    it('should not add duplicate urls');
    it('should resolve relative urls');
    it('should only accept urls from the same domain');

    it('should not add javascript urls', () => {
        PageQueue.clear();

        expect(PageQueue.urlsToProcess).to.be.empty;

        PageQueue.enqueue('javascript:alert("test")');

        expect(PageQueue.urlsToProcess).to.be.empty;
    });

    it('should fail on start, if the Queue hasn\'t been setup', () => {
        expect(PageQueue.start).to.throw(Error, /PageQueue hasn't been setup correctly/);
    });
});