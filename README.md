# APPLICATURE LIBRARIES

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server
  ### applicature/styles package
    npm run watch-styles

  ### applicature/universal-component package
    npm run watch-components
  Keep in mind that before run, you will need to have build of applicature/styles (`npm run watch-styles` or `ng build @applicature/styles`)

  ### demo
  Just for developing.
  Keep in mind that before run, you will need to have build of **applicature/styles** (`npm run watch-styles` or `ng build @applicature/styles`) and **applicature/universal-components** (`npm run watch-components` or `ng build @applicature/components`)

    npm run start

  ### ngx-components-doc
  This is documentation project for **applicature/universal-component package**
  Keep in mind that before run, you will need to have build of **applicature/styles** (`npm run watch-styles` or `ng build @applicature/styles`) and **applicature/universal-components** (`npm run watch-components` or `ng build @applicature/components`)

    npm run serve-doc

## Build
  ### applicature/styles package
    npm run build-styles-package

  ### applicature/universal-component package
    npm run build-components-package

  ### ngx-components-doc
     npm run build && npm run build-doc
