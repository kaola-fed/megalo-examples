const proxyMidlleware = require('http-proxy-middleware');
const config = require('../../config');
const mockMiddleware = require('./dev-mock');
const mockConfig = require('../../mock.config');

const proxyMiddleware = (proxyAddress) => {
    const proxyTable = config.dev.proxyTable;

  const filter = (pathname, req) => {
    return Object.keys(mockConfig).some((key) => {
      return pathname.match(mockConfig[key].proxyRegExps);
    });
  }
  return proxyMidlleware(filter, {target: proxyTable[proxyAddress]});
};

module.exports = () => {
    const argv = Array.prototype.slice.call(process.argv, 2);
    const proxyAddress = argv[0];
    if (!argv.length || proxyAddress === 'mock') {
        return mockMiddleware;
    } else {
        return proxyMiddleware(proxyAddress);
    }
};
