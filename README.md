# APPLICATURE LIBRARIES
- [@applicature/ngx-universal-components](projects/applicature/components/README.md)
- [@applicature/styles](projects/applicature/styles/README.md)

## Development server
  ### applicature/styles package

    npm run watch:styles

  ### applicature/universal-component package
  Keep in mind that before run, you will need to have build of **applicature/styles**

    npm run watch:styles 

  or 

    npm run build:styles

  then run 

    npm run watch:components

  ### demo
  Just for developing.

  Keep in mind that before run, you will need to have build of **applicature/styles** and **applicature/universal-components**

    npm run watch:styles

  then run

    npm run watch:components

  then run

    npm run start

  or

    npm run build && npm run start

  ### ngx-components-doc
  This is documentation project for **applicature/universal-component package**

  Keep in mind that before run, you will need to have build of **applicature/styles** and **applicature/universal-components**

    npm run watch:styles

  then run

    npm run watch:components

  then run

    npm run serve-doc

  or

    npm run build && npm run serve-doc

## Build
  ### applicature/styles package
    npm run build-package:styles

  ### applicature/universal-component package
    npm build-package:components

  ### ngx-components-doc
     npm run build-doc
