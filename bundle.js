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

var LOGIN_REQUEST = types.LOGIN_REQUEST,
    LOGIN_SUCCESS = types.LOGIN_SUCCESS,
    LOGIN_FAILURE = types.LOGIN_FAILURE,
    LOGOUT_SUCCESS = types.LOGOUT_SUCCESS;


var requestLogin = function requestLogin(provider) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    provider: provider
  };
};

var receiveLogin = function receiveLogin(_ref) {
  var user = _ref.user,
      token = _ref.token;

  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    token: token,
    user: user
  };
};

var loginError = function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    error: error
  };
};

var receiveLogout = function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false
  };
};

// Logs the user out
var logoutUser = function logoutUser() {
  return function (dispatch) {
    dispatch(receiveLogout());
  };
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

var LOGIN_REQUEST$1 = types.LOGIN_REQUEST,
    LOGIN_SUCCESS$1 = types.LOGIN_SUCCESS,
    LOGIN_FAILURE$1 = types.LOGIN_FAILURE,
    LOGOUT_REQUEST = types.LOGOUT_REQUEST,
    LOGOUT_SUCCESS$1 = types.LOGOUT_SUCCESS;


var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case LOGIN_REQUEST$1:
      return _extends({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: false,
        provider: action.provider
      });
    case LOGIN_SUCCESS$1:
      return _extends({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.token ? true : false,
        token: action.token,
        user: action.user
      });
    case LOGIN_FAILURE$1:
      return _extends({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: false,
        error: action.error,
        provider: null
      });
    case LOGOUT_REQUEST:
      return _extends({}, state, {
        isFetching: action.isFetching
      });
    case LOGOUT_SUCCESS$1:
      return _extends({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: false,
        provider: null,
        user: null,
        token: null
      });
    default:
      return state;
  }
};

var authArg = {
  save_action: types.LOGIN_SUCCESS,
  remove_action: types.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth"
};

var authStorage = manageStateStorage(authArg);

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

// actions

exports.requestLogin = requestLogin;
exports.receiveLogin = receiveLogin;
exports.loginError = loginError;
exports.receiveLogout = receiveLogout;
exports.logoutUser = logoutUser;
exports.types = types;
exports.manageStateStorage = manageStateStorage;
exports.authReducer = authReducer;
exports.authStorage = authStorage;
exports.hydrateStore = hydrateStore;
exports.hydrateAll = hydrateAll;
