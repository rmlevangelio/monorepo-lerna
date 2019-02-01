## Commands
* All dependency packages are downloaded under the repository root node_modules directory:
```
yarn install
```

* Start a dev server (run babel in all packages in developer webpack mode & watch files) || http://localhost:8080/monorepo
```
yarn dev
```

* Build babel & webpack across all packages
```
yarn build
```

* Creates a new release of the packages that have been updated. Prompts for a new ver sion. Creates a new git commit/tag in the process of publishing to npm.
  > if problems try tag commit: ```git tag -a v0.0.x -m "my version x'```

```
yarn release
```

* Deploy to github pages: https://rmlevangelio.github.io/monorepo-lerna/
```
yarn deploy
```

## Directory structure

```txt
.
├── README.md
├── lerna.json
├── package.json
├── packages
│   ├── app0 ...app1          // Asynchronously loaded packages (via webpack chunks) -> local
│   │   ├── package.json
│   │   └── src
│   │       └── index.jsx
│   ├── app2-npm ...app4-npm  // Asynchronously loaded packages (via webpack chunks) -> local + published to npm
│   │   ├── package.json
│   │   └── src
│   │       └── index.jsx
│   └── home               // Web apps main manager package
│       ├── package.json
│       ├── src
│       │   ├── index.html
│       │   └── index.jsx
│       └── webpack.config.js
└── yarn.lock
```

## TODO:
* service workers (caching)
