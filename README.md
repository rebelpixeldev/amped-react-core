## Amped React Core

This project is for all the core frontend functionality to be used within the Amped Framework. Each of the directories can be considered modules which each contain their own container, components, styles, factories, routes and anything else that would be related to the name of the module.

Currently this project does not by itself and should be included into a [amped-react-boilerplate](https://github.com/rebelpixeldev/amped-react-boilerplate) project

### Modules
* Alerts - Global alert components such as a confirm message, modal and snackbar
* Auth - All the components and logic that has to do with logging in or registering a user
* Charts - Chart components that will display data in a D3 chart
* Common - These are all the things that do something too specific to be put into any module. Normally they act within themselves and require props to be passed into them in order to work
* Core - There is a lot of specific logic that sets up and provides utilities to the entire project. Some examples of things that are in here are, the service to make the api requests, a higher order component to connect a component with a socket and a grouped export of all the reducers and routes for the react core
* Crud - Components that are automatically hooked up to a model based on the model name passed into them. This includes both display the data of the model in a table as well as the crud form to edit or create data on the model,
* Files - Handles all of the media library and files upload components
* Form - Form component to build all the forms within the framework. It also holds all of the form elements.
* Layout - Global components that will go into the layout like a Topbar and Sidebar. *Currently the sidebar is static but future releases will make is dynamic based on users role*
* Table - A customizable table and table components
* User - All components having to do with displaying the users data and also includes all of the users default routes like the users profile.

### Related Projects
* [Amped react boilerplate](https://github.com/rebelpixeldev/amped-react-boilerplate)
* [Amped api boilerplate](https://github.com/rebelpixeldev/amped-api-boilerplate)
* [Amped api](https://github.com/rebelpixeldev/amped-api)