# About the app
This application is a DEMO app for purposes of client test process (author VP).

# Getting Started
## Running the app in local env
Clone or download the repo on your computer first.\

To run this application you will need NodeJS installed.\
You can download it from [here](https://nodejs.org/en/download/package-manager).

We recommend using NodeJS version 19.9.x or greater for the best experience.

After installing NodeJS, you have to run command
### `npm install`

After innstalling all packages, you can start app locally by running command
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This app is initialized with CRA, [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Code formatting and checking
In the app eslint rules are added that are runnning all the time.
For code formatting, we have enabled auto setting however, you can always run following command to check if formatting is ok
### `npm run prettier:check`

To auto fix any format issues run
### `npm run prettier`

To auto fix any lint issues run
### `npm run lint`
