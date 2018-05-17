"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


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
    return babelHelpers.extends({}, merged, state);
  });
  return combinedStates;
};

exports.hydrateStore = hydrateStore;
exports.hydrateAll = hydrateAll;