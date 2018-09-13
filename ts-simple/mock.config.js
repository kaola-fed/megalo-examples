const path = require('path');

module.exports = {
	// test前缀的 会被当做接口
	test: {
		asyncMockPath: path.join(__dirname, 'mock', 'async_mock'),
		proxyRegExps: /^\/test/,
		mockUrls: []
	},
};
