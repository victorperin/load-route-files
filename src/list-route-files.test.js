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

  it('should list files with custom route filename', async () => {
    mockFs({
      home: {'someCustomRouteFilename.js': ''},
      someotherThing: {'someCustomRouteFilename.js': ''},
      'file.js': '',
    });

    const listOfFakeFiles = [
      pathResolver('./home/someCustomRouteFilename.js'),
      pathResolver('./someotherThing/someCustomRouteFilename.js')
    ];

    const result = await listRouteFiles({directory: '.', routeFilename: 'someCustomRouteFilename'});

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

  it('should not list nonexistent route files with custom route filename', async () => {
    mockFs({
      home: {'anotherCustomName.js': ''},
      someotherThing: {'anotherCustomName.js': ''},
      'file.js': '',
      teste: {'model.js': '', 'tests.js':''},
    });

    const listOfFakeFiles = [
      pathResolver('./home/anotherCustomName.js'),
      pathResolver('./someotherThing/anotherCustomName.js'),
    ];
    const wrongFile = pathResolver('./teste/anotherCustomName.js');

    const result = await listRouteFiles({directory: '.', routeFilename: 'anotherCustomName'});

    result.should.have.same.members(listOfFakeFiles);
    result.should.not.contain(wrongFile);
  });

});
