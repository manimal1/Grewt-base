# I. M. GREWT (pronouned: I AM GROOT) - The Fullstack Avenger App boilerplate project

**I**stantiates

**M**ySQL* / MongoDB*

**G**raphQL*  
**R**eact  
**E**xpress*  
**W**ebpack  
**T**ypeScript

Items with \* means they are options. You can choose either mySQL or MongoDB as your database of choice. You can also choose either GraphQL or Express as your server. There is also an option to choose either Redux or MobX for your clientside state management.

## System requirements

- You'll need node v10+
- MySQL installed and a server running locally with the matching user and userPassword as defined in your [.env](###-Environment-Variables---REQUIRED) file
- It is also recommended **(but not required)** that you have React and Redux dev tools browser extensions enabled

## Getting Started

### Environment Variables - REQUIRED

This project uses node environment variables that you will need to set in order for it to run correctly. It uses a `.env` file and the dotenv npm package to manage these. As you don't want just anyone to have access to these, the .env file is added to the .gitignore list, and therefore must be created by you. The project already has the required variables mapped and exported in `./src/constants/envVars.ts`, where you will need to manage any additional variables that you create. Simply follow these steps to get your new application up and running:

1. Create a .env file in the project's root directory
2. Add the required variables (with their proper values) to the .env file:
   - DB_HOST_DEVELOPMENT='localhost'
   - DB_HOST_PRODUCTION='localhost'
   - DB_HOST_TESTING='localhost'
   - DB_PASSWORD='yourPasswordGoesHere'
   - DB_USER_DEVELOPMENT='root'
   - DB_USER_PRODUCTION='root'
   - DB_USER_TESTING='root'
   - JWT='thisIsTheGrrewtJwt'
   - TEST_JWT='thisIsTheGrrewtTestJwt'

### How to run the project

Run all commands from root directory:

The first step is to load all dependencies (should only need to perform once after intial pull):

- `yarn install`

To build and run the development server, use the following command:

- `yarn run start:dev`

To create a production build, which compiles all output to the ./dist directory, run the following command:

- `yarn run build`

To run the linter process and perform a code quality check, run:

- `yarn run linter`

The following commands run unit and end-to-end tests:

- For jest unit tests `yarn test`
- For end-to-end tests run `yarn run test:e2e`

## Linting & Formatting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to maintain code standards and consistency. You should configure your editor and adjust the eslint and prettier files to suit your own personal preferences. You can run the linter with this command: `yarn run linter`.

Files that handle linting and formatting:

- .eslintrc
- .eslintignore
- .prettierrc

## Testing

This project uses [Jest](https://jestjs.io/) for unit testing and [Cypress](https://www.cypress.io/) for end-to-end testing. Since we are using TypeScript with Cypress, I recommend reading [their short intro on the subject](https://docs.cypress.io/guides/tooling/typescript-support.html#Transpiling-TypeScript-test-files).

As stated above in [How to run the project](##How-to-run-the-project), use these commands to run your tests:

- For jest unit tests `yarn test`
- For end-to-end tests run `yarn run test:e2e`

## Aliases

### Server

This app uses the [link-module-alias](https://www.npmjs.com/package/link-module-alias) package to create simple aliases for module resolution on the server, to avoid using long relative path imports. There is a preinstall and postinstall script associated with this package that runs on install to create the symlinks. In order to create your own aliases, just place them in the `package.json` file inside the `_moduleAliases` object, and update the `compilerOptions.paths` properties in the root `tsconfig.json` file.

You might also have to update the import/resolver alias mapping in the `.eslintrc` file in order for eslint to recognize the alias:

```json
"import/resolver": {
  "node": {
    "alias": {
      "map": [
        ["~config", "src/server/config"],
        ["~constants", "src/server/constants"],
        ["~resources", "src/server/resources"],
        ["~utils", "src/server/utils"]
      ]
    }
  }
}
```

### Client

In the client we use [Webpack's 'Resolve'](https://webpack.js.org/configuration/resolve/) options to manage aliases. Just update the `webpack.config.js` file in the root diretory:

```javascript
resolve: {
  alias: {
    components: path.resolve(__dirname + '/src/client/components'),
    core: path.resolve(__dirname + '/src/client/core'),
    resources: path.resolve(__dirname + '/src/client/resources'),
    utils: path.resolve(__dirname + '/src/client/utils')
  }
}
```

## --- FRONTEND ---

### React

React is the frontend library used in this project. The Material-UI library and Sass are also used for simple styling.

- Frontend routing employs React's BrowserRouter from the stand alone lib [react-router-dom](https://www.npmjs.com/package/react-router-dom). Check out helpful docs [here](https://reacttraining.com/react-router/web/guides/quick-start)
- [Material-UI](https://material-ui.com/)
- [Sass](https://sass-lang.com/)

### Redux or MobX

Currently, Redux is being used for state management. Soon, MobX will also be available.

- [Redux](https://redux.js.org/) has been configured with a couple of useful middlewares: [redux-thunk](https://github.com/reduxjs/redux-thunk) for handling async logic, and the [Redux DevTools Extension](http://extension.remotedev.io/). If you choose to use Redux, I would also recommend using the [reselect](https://github.com/reduxjs/reselect) library, especially for larger applications.
- [MobX](https://mobx.js.org/README.html) is the other great option for state management.

## --- BACKEND ---

Only Node for me!

### Express or GraphQL

Basically, do you want a REST API or a GraphQL API?

- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)

### MySQL or MongoDB

Which do you need: relational or non-relational? Tables or documents?

- [MySQL](https://www.mysql.com/)
- [MongoDB](https://www.mongodb.com/)
