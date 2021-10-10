# Figma Plugin: React Starter

## Table of Contents

- [Install & Build](#install--build)
- [Features](#features)
- [Linting](#linting)

## Install & Build

First, make sure you have [Node.js](https://nodejs.org) installed on your machine.

_if you use nvm_, `nvm use` to switch to 14.15.5

Install: `npm i`

Run project locally: `npm start`

Production build bundle: `npm run bundle`

## Features

- Webpack 5 + React (javascript)
- Production Bundling

## Linting

- `npm run lint` for a list of linting warnings/error in cli
- make sure you have prettier package installed:
  - [prettier for atom](https://atom.io/packages/prettier-atom)
  - [prettier for vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- then make sure to enable these options (packages → prettier):
  - eslint integration
  - automatic format on save (toggle format on save)

Based off [Figma Webpack React (TypeScript) Example](https://github.com/figma/plugin-samples#webpack--react)
