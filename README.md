# APPLICATURE LIBRARIES
- [@applicature/ngx-web3-synergy](projects/applicature/ngx-web3-synergy/README.md)
- [@applicature/styles](projects/applicature/styles/README.md)

## Development server
  ### @applicature/styles package

    npm run watch:styles

  ### @applicature/ngx-web3-synergy package
  Keep in mind that before run, you will need to have build of **@applicature/styles**

    npm run watch:styles 

  or 

    npm run build:styles

  then run 

    npm run watch:web3-synergy

  ### demo
  Just for developing.

  Keep in mind that before run, you will need to have build of **@applicature/styles** and **@applicature/ngx-web3-synergy**

    npm run watch:styles

  then run

    npm run watch:web3-synergy

  then run

    npm run start

  or

    npm run build && npm run start

  ### ngx-components-doc
  This is documentation project for **@applicature/ngx-web3-synergy package**

  Keep in mind that before run, you will need to have build of **@applicature/styles** and **@applicature/ngx-web3-synergy**

    npm run watch:styles

  then run

    npm run watch:web3-synergy

  then run

    npm run serve-doc

  or

    npm run build && npm run serve-doc

## Build
  ### applicature/styles package
    npm run build-package:styles

  ### applicature/ngx-web3-synergy package
    npm build-package:web3-synergy

  ### ngx-components-doc
     npm run build-doc
