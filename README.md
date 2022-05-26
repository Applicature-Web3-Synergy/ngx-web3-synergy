# APPLICATURE LIBRARIES
- [@applicature/ngx-universal-components](projects/applicature/components/README.md)
- [@applicature/styles](projects/applicature/styles/README.md)

## Development server
  ### applicature/styles package
    npm run watch-styles

  ### applicature/universal-component package
  Keep in mind that before run, you will need to have build of **applicature/styles**

    npm run watch-styles or ng build @applicature/styles
    npm run watch-components

  ### demo
  Just for developing.

  Keep in mind that before run, you will need to have build of **applicature/styles** and **applicature/universal-components**

    npm run watch-styles or ng build @applicature/styles
    npm run watch-components or ng build @applicature/components
    npm run start

  ### ngx-components-doc
  This is documentation project for **applicature/universal-component package**

  Keep in mind that before run, you will need to have build of **applicature/styles** and **applicature/universal-components**

    npm run watch-styles or ng build @applicature/styles
    npm run watch-components or ng build @applicature/components
    npm run serve-doc

## Build
  ### applicature/styles package
    npm run build-styles-package

  ### applicature/universal-component package
    npm run build-components-package

  ### ngx-components-doc
     npm run build-doc
