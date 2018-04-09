## dicty-components-redux

This is the home for all reusable dicty Redux content and middleware.

This project uses [rollup.js](https://rollupjs.org/guide/en) and can be installed by `npm install --save dictybase-playground/dicty-components-redux`.

These are used via `import { name } from "dicty-components-redux"`.

### Items that can be used

Reusable actions:

* requestLogin
* receiveLogin
* loginError
* receiveLogout
* logoutUser

Constants:

* LOGIN_REQUEST
* LOGIN_SUCCESS
* LOGIN_FAILURE
* LOGOUT_REQUEST
* LOGOUT_SUCCESS

Middleware:

* manageStateStorage

Reducers:

* authReducer

Store:

* authStorage (this needs to be added into your `applyMiddleware()` wrapper)

Utilities:

* hydrateStore
* hydrateAll

For development, make changes as necessary in your branch then run `npm build` to create the updated `bundle.js` file.
