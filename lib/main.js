"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = require("./middleware/storage.js");

Object.defineProperty(exports, "manageStateStorage", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_storage).default;
  }
});

var _hydrateStore = require("./utils/hydrateStore.js");

Object.defineProperty(exports, "hydrateStore", {
  enumerable: true,
  get: function get() {
    return _hydrateStore.hydrateStore;
  }
});
Object.defineProperty(exports, "hydrateAll", {
  enumerable: true,
  get: function get() {
    return _hydrateStore.hydrateAll;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }