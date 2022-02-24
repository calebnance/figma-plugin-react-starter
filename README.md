# Figma Plugin: React Starter

## Table of Contents

- [Install & Build](#install--build)
- [Features](#features)
- [Linting](#linting)
- [Helpful Links](#helpful-links)

## Install & Build

First, make sure you have [Node.js](https://nodejs.org) installed on your machine.

_if you use nvm_, `nvm use` to switch to 16.13.1

Install: `npm i`

Run Plugin locally with hot-reload: `npm start`

Run UI in Browser: `npm run serve` (only use this for easier UI updates, doesn't interact with Figma layer)

Run Production bundle: `npm run bundle`

## Features

- Webpack 5 + React (javascript)
- Production Bundling + Zipped
- Interact with UI in Browser

## Linting

- `npm run lint` for a list of linting warnings/error in cli
- make sure you have prettier package installed:
  - [prettier for atom](https://atom.io/packages/prettier-atom)
  - [prettier for vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- then make sure to enable these options (packages → prettier):
  - eslint integration
  - automatic format on save (toggle format on save)

# Helpful Links

**Figma**

- [Post Message to UI Layer](https://www.figma.com/plugin-docs/api/figma-ui/#postmessage)
- [Close Plugin](https://www.figma.com/plugin-docs/api/figma-ui/#close)

**Webpack**

- [Webpack development](https://webpack.js.org/guides/development/)
- [Webpack dev server](https://webpack.js.org/configuration/dev-server/)
- [Webpack devtool](https://webpack.js.org/configuration/devtool/)
- [Webpack + React guide help](https://www.toptal.com/react/webpack-react-tutorial-pt-1)
- Errors
  - [Webpack public pathing](https://stackoverflow.com/questions/64294706/webpack5-automatic-publicpath-is-not-supported-in-this-browser)
  - [Webpack and transpiling](https://stackoverflow.com/questions/59709252/how-can-i-solve-my-typescript-eslint-webpack-transpiling-problem)

Based off [Figma Webpack React (TypeScript) Example](https://github.com/figma/plugin-samples#webpack--react)
