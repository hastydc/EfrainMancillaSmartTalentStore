# StProductStoreAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## CUSTOM INSTRUCTIONS

## -> Versiones

Actualmente tengo Node v20.12.2, Angular Cli v17.3.6, Chrome v124.0.6367.119 (ambas versiones las últimas que descargué esta semana porque mi lap agoniza)

## -> Compilar proyecto

npm i con las versiones indicadas

## -> Correr proyecto

npx ng s | e ingresar a la url segun puerto indicado, en la consola para correrlo local, o bien un build y copiando y pegando el dist generado en algun servidor y asegurandonos de tener correcto el base href en el index.html

## -> Correr pruebas

ng test --code-coverage | y podemos validar el coverage tanto en el coverage/index.html como en la consola

## -> Link del repo

El link del repo (branch main en github master en bitbucket) de github es https://github.com/hastydc/EfrainMancillaSmartTalentStore

## Link del sitio desplegado

El sitio fue desplegado en godaddy y el link es https://efrainmancilla.pantera-studio.com/st-store/

## -> Instrucciones

Primero debemos registrar un usuario tipo admin para crear los productos, y luego un usuario tipo cliente para realizar la compra
El admin solo puede ingresar a las paginas del admin y el cliente solo puede ingresar a las paginas del cliente
La DB ha sido improvisada en localStorage pero debidamente encriptada por seguridad

## -> Deploy

Desafortunadamente no logré desplegar la app en Azure debido a un error de al parecer permisos relacionado a mi cuenta, intente varias posibles soluciones sin exito y varias personas reportan el mismo error en los últimos días que podemos validar en el siguiente link https://github.com/microsoft/vscode-azureappservice/issues/2635

## ---> Notas <---

Lo realicé sobre la última versión de angular y con eso podemos validar que estamos preparados para asumir tanto un proyecto en versiones anteriores, como uno en sus últimas versiones.
