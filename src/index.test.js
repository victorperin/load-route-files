require('chai').should();


describe('load-route-files', async () => {
  const loadRoutes = require('./index');

  it('should require all files inside testPath directory', async () => {

    const result = await loadRoutes({ directory: 'test/util/testPath' })

    result.should.have.lengthOf(2);
    result.map( item => item.should.be.a('function') );
  });
});
