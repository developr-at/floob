import PageFetcher from './page/fetcher'

PageFetcher.fetch('http://www.test.at', (pageResult) => {
    console.log(pageResult);
});
