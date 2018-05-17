## dicty-components-redux

This is the home for all reusable dicty Redux content and middleware.

This project uses [rollup.js](https://rollupjs.org/guide/en) and can be installed by `npm install --save dictybase-playground/dicty-components-redux`.

These are used via `import { name } from "dicty-components-redux"`.

### Items that can be used

**Constants:**

* LOGIN_REQUEST
* LOGIN_SUCCESS
* LOGIN_FAILURE
* LOGOUT_REQUEST
* LOGOUT_SUCCESS

These are self-explanatory.

**Middleware:**

* [manageStateStorage](/src/middleware/storage.js)

This function has four parameters:

* `save_action`: the action type for saving the state
* `remove_action`: the action type for removing the state
* `key`: the key that will be used to save part of the store's state (leaving blank will let entire state be saved)
* `namespace`: the key that will be used to save to localStorage

**Store:**

* [authStorage](/src/store/store.js) (this needs to be added into your `applyMiddleware()` wrapper)

**Utilities:**

* [hydrateStore](/src/utils/hydrateStore.js)
* [hydrateAll](/src/utils/hydrateStore.js)

These are passed into the `initialState` like so:

```
const initialState = hydrateAll(
  hydrateStore({ key: "auth", namespace: "auth" }),
  hydrateStore({ key: "cart", namespace: "shoppingCart" })
)
```

For development, make changes as necessary in your branch then run `npm build` to create the updated `bundle.js` file.
