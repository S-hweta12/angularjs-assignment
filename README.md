# AngularJS Application

### Git repository
https://github.com/S-hweta12/angularjs-assignment

### Steps to run the project

1. In root folder and server folder run `npm install`
2. Extract `lib` folder in the app/ 
3. Run `node server.js` in server folder to start the backend server
4. Run `npm start` in root folder and navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application running.

## Application Directory Layout

```
app/                     --> all the source code of the app
  lib/...                --> 3rd party JS/CSS libraries, including AngularJS and jQuery (copied over from `node_modules/`)
  core/                  --> all the source code of the core module (stuff used throughout the app)
    data/...        --> files for getting the data
    core.module.js       --> the core module
  followers-list/...         --> files for the `followersList` module that shows followers list, including JS source code, HTML templates
  followers-sorting/...         --> files for the `followersSorting` module that sorts the followers data, including JS source code, HTML templates
  date-range-picker/...         --> files for the `dateRangePicker` module, including JS source code, HTML templates
  app.config.js          --> app-wide configuration of AngularJS services
  app.module.js          --> the main app module
  index.html             --> app layout file (the main HTML template file of the app)

node_modules/...         --> 3rd party libraries and development tools (fetched using `npm`)

package.json             --> Node.js specific metadata, including development tools dependencies
package-lock.json        --> Npm specific metadata, including versions of installed development tools dependencies
```