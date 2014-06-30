## Using this project

First of all you need to install [NodeJS](http://nodejs.org).

Once you have installed NodeJS you can use `npm` to install `cordova` and `ionic` by running:

```bash
$ sudo npm install -g cordova
$ sudo npm install -g ionic
```

These commands can be issued from any directory, they are global installs.

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page.

Now change directories to the iRiverLevels-ionic folder and run:

```bash
$ npm install
```

This will install the project specific dependencies.

To emulate, run the following (try just running emulate first - you will have platform installed already because it is in the repo, i'm not sure how this will behave on someone elses computer)

```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```
To start a local development server to allow for straight HTML/JS development run the following

```bash
$ grunt server
```
This will start a local server on port 9000. Any changes made to files in the `www` directory will automatically be reloaded into the browser.