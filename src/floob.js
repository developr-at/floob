import FloobApp from './floob-app';
import PageFetcher from './page/fetcher';
import Option from './option/option';

const options = Option.parse(process.argv);

if (options.help) {
	Option.showHelp();
	process.exit();
}

if (options.url) {
    FloobApp.setup(options);
    FloobApp.process(options);
} else {
	Option.showHelp();
}