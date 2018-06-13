# Load Route Files
A package to load all route files to then use them as middlewares.

# Instalation
Just run:
```
  npm i load-route-files
```

# Usage
In your project, you should have a folder with subfolders. Those folders should contain a `routes.js` file inside.
In this example I use a folder called `domains`. So the structure should be at least the following:
```
.
├── ...
├── api.js
├── domains
│   ├── users
│   │   ├── routes.js
|   |   └── ...
│   └── permissions
|       ├── routes.js
|       └── ...
└── ...
```

```javascript  
  // in api.js
  const Koa = require('koa');
  const api = new Koa();

  const loadRoutes = require('load-route-files');
  const routes = await loadRoutes({ directory: 'domains' });

  const koaCompose = require('koa-compose');

  api.use( koaCompose(routes) );
```

You can also specify a `routeFilename` in config, with is a custom name for the route file, if you wish.
