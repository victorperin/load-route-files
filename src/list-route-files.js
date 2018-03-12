const Promise = require('bluebird');
const listDirectories = require('list-directories');
const path = require('path');
const fs = require('fs');

const accessPromise =  Promise.promisify(fs.access);

module.exports = ({ directory, routeFilename = 'routes' }) => {
  const fullPath = path.resolve(process.cwd(), directory);

  return Promise.resolve(fullPath)
    .then(listDirectories)
    .then(Array.from)
    .map( (subDirectory) => path.resolve(fullPath, subDirectory, `./${routeFilename}.js`) )
    .filter((routeFile) =>
      accessPromise(routeFile)
        .then( () => true )
        .catch( () => false )
    )
};
