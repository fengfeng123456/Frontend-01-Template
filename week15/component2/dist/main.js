/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../animation/animation.js":
/*!*********************************!*\
  !*** ../animation/animation.js ***!
  \*********************************/
/*! exports provided: Timeline, Animation, ColorAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorAnimation\", function() { return ColorAnimation; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// 添加了；restart；add方法改善\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    var _this = this;\n\n    _classCallCheck(this, Timeline);\n\n    this.animations = [];\n    this.requsetID = null;\n    this.isLoop = false;\n    this.state = 'inited';\n\n    this.tick = function () {\n      var t = Date.now() - _this.startTime;\n\n      var animations = _this.animations.filter(function (animation) {\n        return !animation.finished;\n      });\n\n      var _iterator = _createForOfIteratorHelper(_this.animations),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var animation = _step.value;\n          var object = animation.object,\n              property = animation.property,\n              timingFunction = animation.timingFunction,\n              delay = animation.delay,\n              template = animation.template,\n              duration = animation.duration,\n              addTime = animation.addTime; // timingFunction 参考网址  cubic-bezier.com\n\n          if (t > delay + addTime) {\n            var progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数\n            // if (progression > 0 && progression < 1){\n\n            if (t > duration + delay + addTime) {\n              progression = 1;\n              animation.finished = true;\n            } // let value = start + progression * (end -start)  // value就是根据progression计算的当前值\n\n\n            var value = animation.valueFromProgression(progression); // value就是根据progression计算的当前值\n\n            object[property] = template(value); // }\n          }\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      if (animations.length) _this.requsetID = requestAnimationFrame(_this.tick);else if (_this.isLoop) _this.restart();\n    };\n  }\n\n  _createClass(Timeline, [{\n    key: \"pause\",\n    value: function pause() {\n      if (this.state != 'playing') return;\n      this.state = 'paused';\n      this.pauseTime = Date.now();\n      if (this.requsetID !== null) cancelAnimationFrame(this.requsetID);\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.state != 'paused') return;\n      this.state = 'playing'; // 相当于去掉暂停的时间\n\n      this.startTime += Date.now() - this.pauseTime;\n      this.tick();\n    }\n  }, {\n    key: \"start\",\n    value: function start(isLoop) {\n      if (this.state != 'inited') return;\n      this.isLoop = isLoop;\n      this.state = 'playing';\n      this.startTime = Date.now();\n      this.tick();\n    }\n  }, {\n    key: \"restart\",\n    value: function restart() {\n      if (this.state === 'playing') this.pause(); // this.animations = []\n\n      this.animations.forEach(function (animation) {\n        return animation.finished = false;\n      });\n      this.requsetID = null;\n      this.state = 'playing';\n      this.startTime = Date.now();\n      this.pauseTime = null;\n      this.tick();\n    } // addTime 用来处理后开始问题\n\n  }, {\n    key: \"add\",\n    value: function add(animation, addTime) {\n      this.animations.push(animation);\n      animation.finished = false;\n      if (this.state === 'playing') animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;else animation.addTime = addTime !== void 0 ? addTime : 0;\n    }\n  }]);\n\n  return Timeline;\n}();\nvar i = 0;\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.template = template;\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay || 0;\n    this.timingFunction = timingFunction; // this.timingFunction = timingFunction || ((start, end) => {\n    //   return t => start + (t / duration)* (end-start)\n    // })\n  }\n\n  _createClass(Animation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return this.start + progression * (this.end - this.start);\n    }\n  }]);\n\n  return Animation;\n}();\nvar ColorAnimation = /*#__PURE__*/function () {\n  function ColorAnimation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, ColorAnimation);\n\n    this.object = object;\n    this.property = property;\n\n    this.template = template || function (v) {\n      return \"rgba(\".concat(v.r, \",\").concat(v.g, \",\").concat(v.b, \",\").concat(v.a, \")\");\n    };\n\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay || 0;\n    this.timingFunction = timingFunction; // this.timingFunction = timingFunction || ((start, end) => {\n    //   return t => start + (t / duration)* (end-start)\n    // })\n  }\n\n  _createClass(ColorAnimation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return {\n        r: this.start.r + progression * (this.end.r - this.start.r),\n        g: this.start.g + progression * (this.end.g - this.start.g),\n        b: this.start.b + progression * (this.end.b - this.start.b),\n        a: this.start.a + progression * (this.end.a - this.start.a)\n      };\n    }\n  }]);\n\n  return ColorAnimation;\n}();\n/*\r\n\r\nlet animation = new Animation(object, property, start, end, duration, dalay, timingFunction)\r\nlet animation2 = new Animation(object, property, start, end, duration, dalay, timingFunction)\r\n\r\n// 时间线 同时控制多个动画\r\nlet timeline = new Timeline\r\n\r\ntimeline.add(animation)\r\ntimeline.add(animation2)\r\n\r\ntimeline.start()\r\ntimeline.pause()\r\ntimeline.resume()\r\ntimeline.stop()\r\n\r\n\r\nsetTimeout\r\nsetInterval\r\nrequestAnimationFrame\r\n\r\n*/\n\n//# sourceURL=webpack:///../animation/animation.js?");

/***/ }),

/***/ "../animation/cubicBezier.js":
/*!***********************************!*\
  !*** ../animation/cubicBezier.js ***!
  \***********************************/
/*! exports provided: cubicBezier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\n\n//# sourceURL=webpack:///../animation/cubicBezier.js?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrap\", function() { return Wrap; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(Cls, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  console.log(arguments);\n  var o;\n\n  if (typeof Cls === 'string') {\n    // 解决当，元素是小写的时候，传过来的cls是字符串的行为 'div'\n    o = new Wrap(Cls);\n  } else {\n    o = new Cls();\n  }\n\n  for (var name in attributes) {\n    // 设置property\n    // o[name] = attributes[name]\n    // 设置attribute\n    o.setAttribute(name, attributes[name]);\n  } // 处理child\n\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') child = new Text(child);\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  visit(children);\n  return o;\n} // 处理文本节点\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrap = /*#__PURE__*/function () {\n  function Wrap(type) {\n    _classCallCheck(this, Wrap);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrap, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      console.log('Parent::attribute', name, value);\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, fn) {\n      this.root.addEventListener(type, fn);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrap;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n/* harmony import */ var _animation_animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../animation/animation.js */ \"../animation/animation.js\");\n/* harmony import */ var _animation_cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../animation/cubicBezier.js */ \"../animation/cubicBezier.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // import {Carousel} from './Carousel.view'\n\n\n\n\nvar linear = function linear(t) {\n  return t;\n};\n\nvar ease = Object(_animation_cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__[\"cubicBezier\"])(.25, .1, .25, 1);\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel() {\n    _classCallCheck(this, Carousel);\n\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n    this.data = [];\n  }\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this[name] = value;\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      var children = this.data.map(function (url) {\n        var element = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"img\", {\n          src: url\n        }); // 这里返回的是一个对象，，需要去root才能获得元素\n\n        element.addEventListener('dragstart', function (event) {\n          return event.preventDefault();\n        });\n        return element;\n      });\n      var root = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n        \"class\": \"carousel\"\n      }, children);\n      var position = 0;\n      var tl = new _animation_animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Timeline\"]();\n\n      var nextPic = function nextPic() {\n        for (; position < children.length; position++) {\n          // 获得一定范围内的数字循环，取余算法 \n          var nextPosition = (position + 1) % _this.data.length;\n          var current = children[position];\n          var next = children[nextPosition];\n          tl.add(new _animation_animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](current.style, 'transform', -100 * position, -100 - 100 * position, 500, (position + 1) * 3000, ease, function (v) {\n            return \"translate(\".concat(v, \"%)\");\n          }));\n          tl.add(new _animation_animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](next.style, 'transform', 100 - 100 * nextPosition, -100 * nextPosition, 500, (position + 1) * 3000, ease, function (v) {\n            return \"translate(\".concat(v, \"%)\");\n          }));\n        }\n\n        tl.start(true);\n        console.log(tl);\n      };\n\n      nextPic(); // setTimeout(nextPic, 3000)\n      // let nextPic = () =>{\n      //   // 获得一定范围内的数字循环，取余算法 \n      //   let nextPosition = (position+1)%this.data.length\n      //   let current = children[position];\n      //   let next = children[nextPosition]\n      //   current.style.transition = 'ease 0s'\n      //   next.style.transition = 'ease 0s'\n      //   // 开始状态\n      //   current.style.transform = `translateX(${-100*position}%)`\n      //   next.style.transform = `translateX(${100 - 100*nextPosition}%)`\n      //   setTimeout(() => {\n      //     current.style.transition = ''\n      //     next.style.transition = ''\n      //     // 结束状态\n      //     current.style.transform = `translateX(${-100-100*position}%)`\n      //     next.style.transform = `translateX(${-100*nextPosition}%)`\n      //     position = nextPosition\n      //   }, 16)\n      //   setTimeout(nextPic, 3000)\n      // }\n      // 保持第一个停留3s\n      // setTimeout(nextPic, 3000)\n      // 第一步\n\n      return root;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      // 这里会多出一层div，是因为这里会调用Wrap\n      // this.slot = <div></div>\n      // for(let child of this.children){\n      //   this.slot.appendChild(child)\n      // }\n      this.render().mountTo(parent);\n    }\n  }]);\n\n  return Carousel;\n}();\n\nvar componet = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(Carousel, null);\ncomponet.data = [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"];\ncomponet.mountTo(document.body);\nconsole.log(componet);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });