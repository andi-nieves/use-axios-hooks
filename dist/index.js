'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var axios = require('axios');
var axios__default = _interopDefault(axios);

export function configure(options) {
  if (options.axios) {
    axios__default = options.axios
  }
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var actions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_SUCCESS: 'REQUEST_END',
  REQUEST_CANCEL: 'REQUEST_CANCEL',
  REQUEST_FAIL: 'REQUEST_FAIL'
};
var initialState = {
  isLoading: false,
  error: null,
  data: null,
  isCanceled: false
};
function reducer(state, action) {
  console.log('action', action)
  switch (action.type) {
    case actions.REQUEST_START:
      return _objectSpread2({}, state, {
        isLoading: true
      });

    case actions.REQUEST_SUCCESS:
      return _objectSpread2({}, state, {
        isLoading: false,
        data: action.payload,
        error: null
      });

    case actions.REQUEST_FAIL:
      return _objectSpread2({}, state, {
        isLoading: false,
        data: null,
        error: action.payload
      });

    case actions.REQUEST_CANCEL:
      return _objectSpread2({}, state, {
        isLoading: false,
        isCanceled: true
      });

    default:
      return _objectSpread2({}, state);
  }
}

function useAxios(options) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: 'GET'
    };
  }

  var _useReducer = react.useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var cancel = react.useRef();
  react.useEffect(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: actions.REQUEST_START
              });
              _context.prev = 1;
              _context.next = 4;
              return axios__default(_objectSpread2({}, options, {}, {
                cancelToken: new axios.CancelToken(function (c) {
                  cancel.current = c;
                })
              }));

            case 4:
              response = _context.sent;
              dispatch({
                type: actions.REQUEST_SUCCESS,
                payload: response
              });
              _context.next = 14;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              if (!axios__default.isCancel(_context.t0)) {
                _context.next = 13;
                break;
              }

              dispatch({
                type: actions.REQUEST_CANCEL
              });
              return _context.abrupt("return");

            case 13:
              dispatch({
                type: actions.REQUEST_FAIL,
                payload: _context.t0
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }))();

    return function () {
      return cancel.current('useAxios cancelled on component un-mount');
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);
  return [state, cancel.current];
}

function useAxiosInterval(options, interval) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: 'GET'
    };
  }

  var _useReducer = react.useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var intervalId = react.useRef();
  var cancel = react.useRef();
  var cancelToken = react.useRef([]);
  react.useEffect(function () {
    var fetch =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(config) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: actions.REQUEST_START
                });
                _context.prev = 1;

                if (!cancel.current) {
                  _context.next = 4;
                  break;
                }

                throw new Error({
                  isCancel: true
                });

              case 4:
                _context.next = 6;
                return axios__default(_objectSpread2({}, config, {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelToken.current.push(c);
                  })
                }));

              case 6:
                response = _context.sent;
                dispatch({
                  type: actions.REQUEST_SUCCESS,
                  payload: response
                });
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);

                if (!axios__default.isCancel(_context.t0)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return");

              case 14:
                dispatch({
                  type: actions.REQUEST_FAIL,
                  payload: _context.t0
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 10]]);
      }));

      return function fetch(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    intervalId.current = setInterval(function () {
      fetch(options);
    }, interval);
    var canc = cancelToken.current;
    return function () {
      canc.forEach(function (c) {
        c();
      });
      clearInterval(intervalId.current);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options), interval]);

  var cancelHandler = function cancelHandler() {
    dispatch({
      type: actions.REQUEST_CANCEL
    });
    cancel.current = true;
    cancelToken.current.forEach(function (c) {
      c();
    });
    clearInterval(intervalId.current);
  };

  return [state, cancelHandler];
}

function useAxiosRetry(options, retryOptions) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      url: options,
      method: 'GET'
    };
  }

  var retryCount = retryOptions.retryCount,
      retryInterval = retryOptions.retryInterval;

  var _useReducer = react.useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var cancelToken = react.useRef([]);
  var gRetryCount = react.useRef(retryCount + 1);
  var interval = react.useRef();
  react.useEffect(function () {
    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    function _fetch() {
      _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(config) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(gRetryCount.current === 0)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                dispatch({
                  type: actions.REQUEST_START
                });
                _context.prev = 3;
                _context.next = 6;
                return axios__default(_objectSpread2({}, config, {}, {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelToken.current.push(c);
                  })
                }));

              case 6:
                response = _context.sent;
                dispatch({
                  type: actions.REQUEST_SUCCESS,
                  payload: response
                });
                _context.next = 16;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);

                if (!axios__default.isCancel(_context.t0)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return");

              case 14:
                dispatch({
                  type: actions.REQUEST_FAIL,
                  payload: _context.t0
                });
                interval.current = setTimeout(function () {
                  gRetryCount.current -= 1;
                  fetch(config);
                }, retryInterval);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));
      return _fetch.apply(this, arguments);
    }

    fetch(options);
    var canc = cancelToken.current;
    return function () {
      canc.forEach(function (c) {
        c();
      });
      clearTimeout(interval.current);
    };
  }, [JSON.stringify(options), JSON.stringify(retryOptions)]);

  var cancelCallback = function cancelCallback() {
    dispatch({
      type: actions.REQUEST_CANCEL
    });
    clearTimeout(interval.current);
    cancelToken.current.forEach(function (c) {
      c();
    });
    gRetryCount.current = 0;
  };

  return [state, cancelCallback];
}

exports.useAxios = useAxios;
exports.useAxiosInterval = useAxiosInterval;
exports.useAxiosRetry = useAxiosRetry;
//# sourceMappingURL=index.js.map
