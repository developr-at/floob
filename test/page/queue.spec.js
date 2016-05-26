import { expect } from 'chai';

import PageQueue from '../../src/page/queue.js';

describe('PageQueue Component', () => {
    it('should be able to initially setup queue', () => {
        const queue = PageQueue.create({ url: "http://www.test.at", processResult: () => {}});

        expect(queue.urlsToProcess).to.exist;
        expect(queue.urlsToProcess).to.have.lengthOf(1);
    });

    it('should be able to clear the queue', () => {
        const queue = PageQueue.create({ url: "http://www.test1.at", processResult: () => {}});
        queue.enqueue("http://www.test1.at/123");
        queue.enqueue("http://www.test1.at/123/456");

        expect(queue.urlsToProcess).to.have.lengthOf(3);
        queue.clear();
        expect(queue.urlsToProcess).to.be.empty;
    });

    it('should not add duplicate urls', () => {
        const queue = PageQueue.create({ url: "http://www.test1.at", processResult: () => {}});
        expect(queue.enqueue("http://www.test1.at/123")).to.be.true;
        expect(queue.enqueue("http://www.test1.at/123")).to.be.false;
        expect(queue.enqueue("http://www.test1.at/123")).to.be.false;
        expect(queue.enqueue("http://www.test1.at/123/456")).to.be.true;
        expect(queue.enqueue("http://www.test1.at/123/456")).to.be.false;
        expect(queue.enqueue("http://www.test1.at/123/456")).to.be.false;

        expect(queue.urlsToProcess).to.have.lengthOf(3);
    });


    it('should resolve relative urls', () => {
        const queue = PageQueue.create({ url: "http://www.test.at", processResult: () => {}});
        expect(queue.enqueue("/page/1")).to.be.true;
        expect(queue.enqueue("/page/2/3")).to.be.true;

        expect(queue.urlsToProcess).to.have.lengthOf(3);
        expect(queue.urlsToProcess[1]).to.equal("http://www.test.at/page/1");
        expect(queue.urlsToProcess[2]).to.equal("http://www.test.at/page/2/3");
    });


    it('should only accept urls from the same domain', () => {
        const queue = PageQueue.create({ url: "http://www.test1.at", processResult: () => {}});
        expect(queue.enqueue("http://www.22222.at/123")).to.be.false;
        expect(queue.enqueue("http://www.33333.at/123/456")).to.be.false;
        expect(queue.enqueue("http://www.test1.at/123/456")).to.be.true;

        expect(queue.urlsToProcess).to.have.lengthOf(2);
    });

    it('should not add javascript urls', () => {
        const queue = PageQueue.create({ url: "http://www.test1.at", processResult: () => {}});

        expect(queue.urlsToProcess).to.have.lengthOf(1);

        queue.enqueue('javascript:alert("test1")');
        queue.enqueue('javascript:alert("test2")');
        queue.enqueue('javascript:alert("test3")');
        queue.enqueue('javascript:alert("test4")');

        expect(queue.urlsToProcess).to.have.lengthOf(1);
    });

    it('should fail if no options are provided', () => {
        expect(PageQueue.create).to.throw(Error, /Please provide at least 'url' and 'processResult' as options./);
    });
});