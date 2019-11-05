# I. M. GREWT (pronouned: I AM GROOT) - The Fullstack Avenger App scaffolding project

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

The first step is to load all dependencies (only perform once after intial pull):

- `yarn install`

To build and run the development server, use the following command:

- `yarn run start:dev`

To create a production build, which compiles output to the ./dist directory, run the following command:

- `yarn run build`

To run the linter process and perform a code quality check, run:

- `yarn run linter`

The following commands run server-side and client-side tests:

- For server-side tests run `yarn test`
- For client-side tests run `yarn run client-tests`

## Linting

This project uses eslint and prettier to maintain code standards and consistency. You should configure your editor according to your personal preferences, but I've included a .vscode settings file as that is my preferred editor - which you should definitely delete if you use another code editor. You can run the linter with this command: `yarn run linter`

Files that handle linting:

- .eslintrc
- .eslintignore
- .prettierrc

## Testing

This project uses [Jest](https://jestjs.io/) as it's testing framework.

As stated above in [How to run the project](##How-to-run-the-project), use these commands to run your tests:

- For server-side tests run `yarn test`
- For client-side tests run `yarn run client-tests`

## --- FRONTEND ---

### React / Redux

React is the frontend library used in this project. Redux or MobX can be used for state management. The Material-UI library and Sass are also used for simple styling.

- Frontend routing employs React's BrowserRouter from the stand alone lib [react-router-dom](https://www.npmjs.com/package/react-router-dom). Check out helpful docs [here](https://reacttraining.com/react-router/web/guides/quick-start)
- [Redux](https://redux.js.org/) has been configured with a couple of useful middlewares: [redux-thunk](https://github.com/reduxjs/redux-thunk) for handling async logic, and the [Redux DevTools Extension](http://extension.remotedev.io/)
