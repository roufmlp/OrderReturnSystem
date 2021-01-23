# OrderReturnSystem

Order Return System with multiple user access and document upload options, with mobile first approch.

Credentials are listed below for different roles (Admin can add new user access)

Admin username: admin/password: admin

Driver: driver/driver

Warehouse: warehouse/warehouse

Finance: finance/finance

Support, for adding new returns: support/support


Front end code has been developed by Angular 6, backend code with asp.net MVC, and the database, Microsoft SQL Server.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build With .Net Wrapper

1. change hfer in _Layout.aspx page (comment/uncomment for UAT/Production).
2. unload the .net project.
3. edit project
4. goto end of the code.
5. Comment/Uncomment appropriate code for UAT and Production links.
6. Save the file
7. Load .net project.
8. delete dist folder, which is inside .net project
9. clean .net project
10. reduld the project
11. publish
12. copy dist folder to published folder.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
