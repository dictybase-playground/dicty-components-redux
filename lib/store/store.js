"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authStorage = undefined;

var _types = require("../constants/types");

var _storage = require("../middleware/storage");

var _storage2 = babelHelpers.interopRequireDefault(_storage);

var authArg = {
  save_action: _types.types.LOGIN_SUCCESS,
  remove_action: _types.types.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth"
};

var authStorage = exports.authStorage = (0, _storage2.default)(authArg);