const Promise = require('bluebird');
const koaCompose = require('koa-compose');

const listRouteFiles = require('./list-route-files');

const loadRoutes = ({ directory, routeFilename }) =>
  listRouteFiles({ directory, routeFilename })
    .map(require);

module.exports = loadRoutes;
