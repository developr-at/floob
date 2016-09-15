'use strict';

var _floobApp = require('./floob-app');

var _floobApp2 = _interopRequireDefault(_floobApp);

var _fetcher = require('./page/fetcher');

var _fetcher2 = _interopRequireDefault(_fetcher);

var _option = require('./option/option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = _option2.default.parse(process.argv);

if (options.help) {
	_option2.default.showHelp();
	process.exit();
}

if (options.url) {
	_floobApp2.default.setup(options);
	_floobApp2.default.process(options);
} else {
	_option2.default.showHelp();
}