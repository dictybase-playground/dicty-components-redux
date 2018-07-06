"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})

/**
 * Save or remove part or entire redux state tree from localStorage by matching to a particular dispatched action
 */
var manageStateStorage = function manageStateStorage(_ref) {
  var save_action = _ref.save_action,
    remove_action = _ref.remove_action,
    key = _ref.key,
    namespace = _ref.namespace

  return function(store) {
    return function(next) {
      return function(action) {
        var result = next(action)
        var state = store.getState()
        try {
          switch (action.type) {
            case save_action:
              if (state[key]) {
                window.localStorage.setItem(
                  namespace,
                  JSON.stringify(state[key]),
                )
              } else {
                window.localStorage.setItem(namespace, JSON.stringify(state))
              }
              break
            case remove_action:
              window.localStorage.removeItem(namespace)
              break
            default:
              break
          }
          return result
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.error(
              "error in saving to localStorage %s",
              JSON.stringify(e),
            )
          }
        }
      }
    }
  }
}
exports.default = manageStateStorage
