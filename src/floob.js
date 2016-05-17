import FloobApp from './floob-app';
import PageFetcher from './page/fetcher';
import Option from './option/option';

var options = Option.parse(process.argv);
if (options.url) {
    FloobApp.process(options);
}
