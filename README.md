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

  const loadRouteFiles = require('load-route-files');
  const routeFiles = loadRouteFiles({ directory: 'domains' });

  routeFiles.forEach(api.use(route));
```
