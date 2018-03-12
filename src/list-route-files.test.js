const pathResolver = require('path').resolve;

require('chai').should();

const mockFs = require('mock-fs');

describe('List route files', () => {
  const listRouteFiles = require('./list-route-files');

  afterAll(() => {
    mockFs.restore()
  })

  it('should list files', async () => {
    mockFs({
      home: {'routes.js': ''},
      someotherThing: {'routes.js': ''},
      'file.js': '',
    });

    const listOfFakeFiles = [
      pathResolver('./home/routes.js'),
      pathResolver('./someotherThing/routes.js')
    ];

    const result = await listRouteFiles({directory: '.'});

    result.should.have.same.members(listOfFakeFiles);

  });

  it('should not list nonexistent route files', async () => {
    mockFs({
      home: {'routes.js': ''},
      someotherThing: {'routes.js': ''},
      'file.js': '',
      teste: {'model.js': '', 'tests.js':''},
    });

    const listOfFakeFiles = [
      pathResolver('./home/routes.js'),
      pathResolver('./someotherThing/routes.js'),
    ];
    const wrongFile = pathResolver('./teste/routes.js');

    const result = await listRouteFiles({directory: '.'});

    result.should.have.same.members(listOfFakeFiles);
    result.should.not.contain(wrongFile);
  });

});
