'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// export your constants
var types = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS"
};

//      


/**
 * Save or remove part or entire redux state tree from localStorage by matching to a particular dispatched action
 */
var manageStateStorage = function manageStateStorage(_ref) {
  var save_action = _ref.save_action,
      remove_action = _ref.remove_action,
      key = _ref.key,
      namespace = _ref.namespace;

  return function (store) {
    return function (next) {
      return function (action) {
        next(action);
        var state = store.getState();
        try {
          switch (action.type) {
            case save_action:
              if (state[key]) {
                window.localStorage.setItem(namespace, JSON.stringify(state[key]));
              } else {
                window.localStorage.setItem(namespace, JSON.stringify(state));
              }
              break;
            case remove_action:
              window.localStorage.removeItem(namespace);
              break;
            default:
              break;
          }
          return next(action);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.error("error in saving to localStorage %s", JSON.stringify(e));
          }
        }
      };
    };
  };
};

var authArg = {
  save_action: types.LOGIN_SUCCESS,
  remove_action: types.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth"
};

var authStorage = manageStateStorage(authArg);

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

//      


/**
 * Load states from localstorage to use in Redux's createStore method
 */
var hydrateStore = function hydrateStore(_ref) {
  var key = _ref.key,
      namespace = _ref.namespace;

  try {
    var data = {};
    if (window.localStorage.getItem(namespace) !== null) {
      data = JSON.parse(window.localStorage.getItem(namespace));
    }
    var loadedState = {};
    if (key) {
      loadedState[key] = data;
    } else {
      loadedState = data;
    }
    return loadedState;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("unable to load state from localStoage %s", JSON.stringify(e));
    }
  }
};

/**
 * Combine multiple load methods to return a single state to use in Redux's createStore method
 */
var hydrateAll = function hydrateAll() {
  for (var _len = arguments.length, loaderFuncs = Array(_len), _key = 0; _key < _len; _key++) {
    loaderFuncs[_key] = arguments[_key];
  }

  var combinedStates = loaderFuncs.reduce(function (merged, loader) {
    var state = loader;
    return _extends({}, merged, state);
  });
  return combinedStates;
};

// constants

exports.types = types;
exports.manageStateStorage = manageStateStorage;
exports.authStorage = authStorage;
exports.hydrateStore = hydrateStore;
exports.hydrateAll = hydrateAll;
