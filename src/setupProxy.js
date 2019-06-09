const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/', { target: 'http://hackathon-test-server.jichoup.trap.show' }));
};