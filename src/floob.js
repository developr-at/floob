import PageFetcher from './page/fetcher';
import Option from './option/option';

var options = Option.parse(process.argv);
if (options.url) {
    PageFetcher.fetch(options.url, (pageResult) => {
        console.log(pageResult);
    });
}
