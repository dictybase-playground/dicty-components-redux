# dicty-components-redux

This is the home for all reusable dicty Redux content and middleware.

This project can be installed by `npm install --save dictybase-playground/dicty-components-redux`.

These are used via `import { name } from "dicty-components-redux"`.

## Items that can be used

### Middleware

* [manageStateStorage](/src/middleware/storage.js)

This function has four parameters:

* `save_action`: the action type for saving the state
* `remove_action`: the action type for removing the state
* `key`: the key that will be used to save part of the store's state (leaving blank will let entire state be saved)
* `namespace`: the key that will be used to save to localStorage

In order to use this, you can create a new object like this:

```
const authArg = {
  save_action: dsctypes.LOGIN_SUCCESS,
  remove_action: dsctypes.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth"
}
```

Then pass this into your `applyMiddleware`:

`applyMiddleware(manageStateStorage(authArg))`

### Utilities

* [hydrateStore](/src/utils/hydrateStore.js)
* [hydrateAll](/src/utils/hydrateStore.js)

These are passed into the `initialState` like so:

```
const initialState = hydrateAll(
  hydrateStore({ key: "auth", namespace: "auth" }),
  hydrateStore({ key: "cart", namespace: "shoppingCart" })
)
```

For development, make changes as necessary in your branch then run `npm run build` to create the updated build.
