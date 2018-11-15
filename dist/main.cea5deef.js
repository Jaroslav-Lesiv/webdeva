// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"assets/js/navigation/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var navLinks = document.querySelectorAll('#nav ul.list li a');

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var ScrollControl =
/*#__PURE__*/
function () {
  function ScrollControl(_ref) {
    var _this = this;

    var _ref$links = _ref.links,
        links = _ref$links === void 0 ? [] : _ref$links;

    _classCallCheck(this, ScrollControl);

    this.hash = window.location.pathname;
    this.links = _toConsumableArray(links).map(function (link) {
      return {
        node: link,
        hash: link.getAttribute('href').replace('#', '/'),
        selector: link.getAttribute('href').replace('/', '#'),
        title: link.getAttribute('title')
      };
    });
    this.nodeList = _toConsumableArray(this.links.map(function (link) {
      return {
        node: document.querySelector(link.selector),
        hash: link.hash
      };
    }));
    window.addEventListener('scroll', function (_) {
      return _this.sectionHandler();
    });
    this.linksHandler();
    this._updateNavigation = debounce(this.updateNavigation, 30);
    if (this.hash && this.hash !== '/') this.updateSections();
  }

  _createClass(ScrollControl, [{
    key: "sectionHandler",
    value: function sectionHandler() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.nodeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          var coords = node.node.getBoundingClientRect();
          var isCurrent = coords.top >= 0 || coords.bottom - 40 > 0;

          if (isCurrent) {
            this.hash = node.hash;

            this._updateNavigation();

            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "linksHandler",
    value: function linksHandler() {
      var _this2 = this;

      this.links.forEach(function (link) {
        link.node.addEventListener('click', function (event) {
          event.preventDefault();
          _this2.hash = link.hash;

          _this2.updateSections();
        });
      });
    }
  }, {
    key: "updateNavigation",
    value: function updateNavigation() {
      var _this3 = this;

      this.links.forEach(function (link) {
        if (link.hash === _this3.hash) {
          link.node.classList.add('btn-primary');
          var title = "WebDeva - ".concat(link.title);
          window.history.replaceState(null, null, link.hash);
          window.document.title = title;
        } else {
          link.node.classList.remove('btn-primary');
        }
      });
    }
  }, {
    key: "updateSections",
    value: function updateSections() {
      var _this4 = this;

      var node = this.nodeList.find(function (node) {
        return node.hash === _this4.hash;
      }).node;
      window.scrollTo({
        top: node.offsetTop,
        behavior: 'smooth'
      });
    }
  }]);

  return ScrollControl;
}();

new ScrollControl({
  links: navLinks
});

var MobileControl =
/*#__PURE__*/
function () {
  function MobileControl() {
    var _this5 = this;

    _classCallCheck(this, MobileControl);

    this.isActive = false;
    this.button = document.querySelector('#nav-toggle_menu');
    this.nav = document.querySelector('#nav');
    this.button.addEventListener('click', function () {
      return _this5.toggle();
    });
    this.main = document.querySelector('.main');
  }

  _createClass(MobileControl, [{
    key: "toggle",
    value: function toggle() {
      this.isActive = !this.isActive; // this.isActive ? this.main.classList.add('blur') : this.main.classList.remove('blur')

      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isActive) {
        this.button.classList.add('active');
        this.nav.classList.add('active');
      } else {
        this.button.classList.remove('active');
        this.nav.classList.remove('active');
      }
    }
  }]);

  return MobileControl;
}();

new MobileControl();
},{}],"assets/js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  secret: 'WCUj3/(iTn.Nw4M]ezy#DU5G&P/0Un',
  domain: 'https://still-journey-84385.herokuapp.com'
};
exports.default = _default;
},{}],"assets/js/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = exports.setStyle = exports.button = exports.img = exports.p = exports.h5 = exports.h4 = exports.h3 = exports.a = exports.strong = exports.li = exports.ul = exports.nav = exports.span = exports.div = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var secret = _config.default.secret,
    domain = _config.default.domain;

var create = function create(tagname) {
  return document.createElement(tagname);
};

var div = create('div');
exports.div = div;
var span = create('span');
exports.span = span;
var nav = create('nav');
exports.nav = nav;
var ul = create('ul');
exports.ul = ul;
var li = create('li');
exports.li = li;
var strong = create('strong');
exports.strong = strong;
var a = create('a');
exports.a = a;
var h3 = create('h3');
exports.h3 = h3;
var h4 = create('h4');
exports.h4 = h4;
var h5 = create('h5');
exports.h5 = h5;
var p = create('p');
exports.p = p;
var img = create('img');
exports.img = img;
var button = create('button');
exports.button = button;

var setStyle = function setStyle(selector) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _arr = Object.entries(styles);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        value = _arr$_i[1];

    selector.style[key] = value;
  }
};

exports.setStyle = setStyle;

var Http =
/*#__PURE__*/
function () {
  function Http(_ref) {
    var secret = _ref.secret,
        domain = _ref.domain;

    _classCallCheck(this, Http);

    this.secret = secret;
    this.domain = domain;
  }

  _createClass(Http, [{
    key: "post",
    value: function post(_ref2) {
      var data = _ref2.data,
          success = _ref2.success,
          error = _ref2.error,
          url = _ref2.url,
          _ref2$myDomain = _ref2.myDomain,
          myDomain = _ref2$myDomain === void 0 ? true : _ref2$myDomain;

      var _url = myDomain ? "".concat(this.domain, "/").concat(url) : url;

      var xhr = new XMLHttpRequest();
      if (myDomain) data._secret = this.secret;
      var json = JSON.stringify(data);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
          success(xhr.response);
        }
      }; // Отсылаем объект в формате JSON и с Content-Type application/json
      // Сервер должен уметь такой Content-Type принимать и раскодировать


      xhr.open('POST', _url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(json);
    }
  }]);

  return Http;
}();

var http = new Http({
  secret: secret,
  domain: domain
});
exports.http = http;
},{"./config":"assets/js/config.js"}],"assets/img/icon/mail.png":[function(require,module,exports) {
module.exports = "/mail.5e2e6892.png";
},{}],"assets/js/images.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  mail: require('../img/icon/mail.png')
};
exports.default = _default;
},{"../img/icon/mail.png":"assets/img/icon/mail.png"}],"assets/js/notification/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._notification = void 0;

var _helper = require("../helper");

var _images = require("../images");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NotificationBlock = _helper.div.cloneNode();

(0, _helper.setStyle)(NotificationBlock, {
  position: 'fixed',
  right: '15px',
  bottom: '15px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end'
});

var NotificationContainer = _helper.div.cloneNode();

(0, _helper.setStyle)(NotificationContainer, {
  padding: '2px 25px',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 3px 13px 1px rgba(0,0,0,0.12)',
  backgroundColor: '#ffffff',
  margin: '5px 0',
  minWidth: '250px'
});

var icon = _helper.img.cloneNode();

icon.src = _images.mail;
(0, _helper.setStyle)(icon, {
  width: '35px',
  height: '35px',
  marginRight: '15px'
});

var NotificationContent = _helper.div.cloneNode();

(0, _helper.setStyle)(NotificationContent, {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
});

var Notification =
/*#__PURE__*/
function () {
  function Notification() {
    _classCallCheck(this, Notification);

    this.NotificationBlock = NotificationBlock;
    document.body.append(NotificationBlock);
    this.anim_show = 'slideInRight';
    this.anim_hide = 'slideOutRight';
  }

  _createClass(Notification, [{
    key: "add",
    value: function add(_ref) {
      var _this = this;

      var label = _ref.label,
          mess = _ref.mess;
      var id = "_".concat(+new Date());
      this.NotificationBlock.prepend(this.create({
        label: label,
        mess: mess,
        id: id
      }));
      setTimeout(function () {
        return _this.remove(id);
      }, 3000);
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var el = this.NotificationBlock.querySelector("#".concat(id));
      el.classList.remove(this.anim_show);
      el.classList.add(this.anim_hide);
      setTimeout(function () {
        return el.remove();
      }, 500);
    }
  }, {
    key: "create",
    value: function create(_ref2) {
      var label = _ref2.label,
          mess = _ref2.mess,
          id = _ref2.id;

      var _NotificationContainer = NotificationContainer.cloneNode();

      _NotificationContainer.id = id;
      _NotificationContainer.className = "transition ".concat(this.anim_show);

      var _NotificationContent = NotificationContent.cloneNode();

      var _icon = icon.cloneNode();

      var _NotificationLabel = _helper.h4.cloneNode();

      _NotificationLabel.className = 'card-label snake';
      _NotificationLabel.innerHTML = label;

      var _NotificationMessage = _helper.p.cloneNode();

      _NotificationMessage.className = 'description';
      _NotificationMessage.innerHTML = mess;

      _NotificationContent.append(_NotificationLabel, _NotificationMessage);

      _NotificationContainer.append(_icon, _NotificationContent);

      return _NotificationContainer;
    }
  }]);

  return Notification;
}();

var _notification = new Notification();

exports._notification = _notification;
window._notification = _notification;
},{"../helper":"assets/js/helper.js","../images":"assets/js/images.js"}],"assets/img/examples/goodWorker/gw_list.png":[function(require,module,exports) {
module.exports = "/gw_list.73200d4c.png";
},{}],"assets/img/examples/normalgame/ng_desktop.png":[function(require,module,exports) {
module.exports = "/ng_desktop.a843fa86.png";
},{}],"assets/img/examples/normalgame/ng_mobile.png":[function(require,module,exports) {
module.exports = "/ng_mobile.591ee84d.png";
},{}],"assets/img/examples/cryptarena-mobile/cam_mobile_list.png":[function(require,module,exports) {
module.exports = "/cam_mobile_list.74d372c1.png";
},{}],"assets/img/examples/cryptarena-mobile/cam_mobile_coin.png":[function(require,module,exports) {
module.exports = "/cam_mobile_coin.a784c15a.png";
},{}],"assets/img/examples/cryptarena-mobile/cam_mobile_news.png":[function(require,module,exports) {
module.exports = "/cam_mobile_news.75869c93.png";
},{}],"assets/img/examples/jlm/jlm_desktop.png":[function(require,module,exports) {
module.exports = "/jlm_desktop.947ca6bf.png";
},{}],"assets/img/examples/jlm/jlm_mobile.png":[function(require,module,exports) {
module.exports = "/jlm_mobile.a2685323.png";
},{}],"assets/img/examples/jlm/jlme_desktop.jpg":[function(require,module,exports) {
module.exports = "/jlme_desktop.f24ed176.jpg";
},{}],"assets/img/examples/nomis/nomis_desktop.png":[function(require,module,exports) {
module.exports = "/nomis_desktop.498fc232.png";
},{}],"assets/img/examples/nomis/nomis_mobile.png":[function(require,module,exports) {
module.exports = "/nomis_mobile.030f1dd1.png";
},{}],"assets/js/lazyLoad/index.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var loadImages = document.querySelectorAll('.lazy-load') || [];
var images = {
  'gw_list': require('../../img/examples/goodWorker/gw_list.png'),
  'ng_desktop': require('../../img/examples/normalgame/ng_desktop.png'),
  'ng_mobile': require('../../img/examples/normalgame/ng_mobile.png'),
  'cam_list': require('../../img/examples/cryptarena-mobile/cam_mobile_list.png'),
  'cam_coin': require('../../img/examples/cryptarena-mobile/cam_mobile_coin.png'),
  'cam_news': require('../../img/examples/cryptarena-mobile/cam_mobile_news.png'),
  'jlm_desktop': require('../../img/examples/jlm/jlm_desktop.png'),
  'jlm_mobile': require('../../img/examples/jlm/jlm_mobile.png'),
  'jlme_desktop': require('../../img/examples/jlm/jlme_desktop.jpg'),
  'nomis_desktop': require('../../img/examples/nomis/nomis_desktop.png'),
  'nomis_mobile': require('../../img/examples/nomis/nomis_mobile.png')
};

var LazyLoad =
/*#__PURE__*/
function () {
  function LazyLoad(_ref) {
    var _this = this;

    var images = _ref.images;

    _classCallCheck(this, LazyLoad);

    this.images = images;
    window.addEventListener('scroll', function () {
      return _this.checkPosition();
    });
  }

  _createClass(LazyLoad, [{
    key: "checkPosition",
    value: function checkPosition() {
      var _this2 = this;

      this.images.length && this.images.forEach(function (image) {
        return _this2.isVisible(image) ? _this2.showImage(image) : undefined;
      });
    }
  }, {
    key: "isVisible",
    value: function isVisible(elem) {
      var coords = elem.getBoundingClientRect();
      var windowHeight = document.documentElement.clientHeight;
      var topVisible = coords.top + windowHeight / 2 > 0 && coords.top < windowHeight;
      var bottomVisible = coords.bottom < windowHeight + windowHeight / 2 && coords.bottom > 0;
      return topVisible || bottomVisible;
    }
  }, {
    key: "showImage",
    value: function showImage(elem) {
      var _src = elem.getAttribute('realsrc');

      var _bg = elem.getAttribute('realbg');

      if (_src) {
        elem.src = _src;
        this.images = Array.prototype.slice.call(this.images).filter(function (image) {
          return image !== elem;
        });
      } else if (_bg) {
        elem.style.backgroundImage = "url(".concat(images[_bg]);
        this.images = Array.prototype.slice.call(this.images).filter(function (image) {
          return image !== elem;
        });
      }
    }
  }]);

  return LazyLoad;
}();

var lazy = new LazyLoad({
  images: loadImages
});
},{"../../img/examples/goodWorker/gw_list.png":"assets/img/examples/goodWorker/gw_list.png","../../img/examples/normalgame/ng_desktop.png":"assets/img/examples/normalgame/ng_desktop.png","../../img/examples/normalgame/ng_mobile.png":"assets/img/examples/normalgame/ng_mobile.png","../../img/examples/cryptarena-mobile/cam_mobile_list.png":"assets/img/examples/cryptarena-mobile/cam_mobile_list.png","../../img/examples/cryptarena-mobile/cam_mobile_coin.png":"assets/img/examples/cryptarena-mobile/cam_mobile_coin.png","../../img/examples/cryptarena-mobile/cam_mobile_news.png":"assets/img/examples/cryptarena-mobile/cam_mobile_news.png","../../img/examples/jlm/jlm_desktop.png":"assets/img/examples/jlm/jlm_desktop.png","../../img/examples/jlm/jlm_mobile.png":"assets/img/examples/jlm/jlm_mobile.png","../../img/examples/jlm/jlme_desktop.jpg":"assets/img/examples/jlm/jlme_desktop.jpg","../../img/examples/nomis/nomis_desktop.png":"assets/img/examples/nomis/nomis_desktop.png","../../img/examples/nomis/nomis_mobile.png":"assets/img/examples/nomis/nomis_mobile.png"}],"assets/js/textBracket/index.js":[function(require,module,exports) {
"use strict";

var _helper = require("../helper");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextBracket =
/*#__PURE__*/
function () {
  function TextBracket(_ref) {
    var selector = _ref.selector;

    _classCallCheck(this, TextBracket);

    if (!selector) return;
    this.selector = selector;
    var _this$selector$datase = this.selector.dataset,
        _this$selector$datase2 = _this$selector$datase.keywords,
        keywords = _this$selector$datase2 === void 0 ? [] : _this$selector$datase2,
        _this$selector$datase3 = _this$selector$datase.duration,
        duration = _this$selector$datase3 === void 0 ? 4000 : _this$selector$datase3;
    this.duration = duration;
    this.words = keywords.split(",");
    this.current = 0;
    this.createNode();
  }

  _createClass(TextBracket, [{
    key: "createNode",
    value: function createNode() {
      var bracket = _helper.div.cloneNode();

      var before = _helper.h3.cloneNode();

      var after = _helper.h3.cloneNode();

      var wordWrap = _helper.div.cloneNode();

      this.wordWrap = wordWrap;

      var word = _helper.h3.cloneNode();

      word.className = 'color-primary';
      before.className = 'color-primary bold mr-10';
      after.className = 'color-primary bold ml-10';
      (0, _helper.setStyle)(word, {
        display: 'inline-flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontWeight: '600'
      });
      (0, _helper.setStyle)(bracket, {
        display: "inline-flex"
      });
      (0, _helper.setStyle)(wordWrap, {
        display: "flex",
        overflow: 'hidden'
      });
      before.innerHTML = "[";
      after.innerHTML = "]";
      bracket.append(before, wordWrap, after);
      var maxWidth = 0;
      var maxHeight = 0;
      this.wordsSelector = this.words.map(function (textWord) {
        var _word = word.cloneNode(true);

        _word.innerHTML = textWord;
        return _word;
      });

      var wordSlider = _helper.div.cloneNode();

      (0, _helper.setStyle)(wordSlider, {
        display: 'flex',
        flexDirection: 'column',
        transition: '0.4s'
      });
      wordSlider.append.apply(wordSlider, _toConsumableArray(this.wordsSelector));
      this.wordWrap.append(wordSlider);
      this.selector.append(bracket);
      this.maxWidth = "".concat(wordSlider.offsetWidth, "px");
      this.maxHeight = this.wordsSelector[0].offsetHeight;
      (0, _helper.setStyle)(this.wordWrap, {
        width: this.maxWidth,
        height: "".concat(this.maxHeight, "px"),
        position: "relative"
      });
      (0, _helper.setStyle)(wordSlider, {
        position: 'absolute',
        top: 0,
        left: 0
      });
      this.wordSlider = wordSlider;
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      (0, _helper.setStyle)(this.wordSlider, {
        transform: "translateY(-".concat(this.current * this.maxHeight, "px)")
      });
      this.current = this.current >= this.wordsSelector.length - 1 ? 0 : this.current + 1;
      setTimeout(function () {
        return _this.update();
      }, this.duration);
    }
  }]);

  return TextBracket;
}();

var textBracket = document.querySelector(".text-bracket");
new TextBracket({
  selector: textBracket
});
},{"../helper":"assets/js/helper.js"}],"assets/js/contacts/index.js":[function(require,module,exports) {
"use strict";

var _helper = require("../helper");

var _notification2 = require("../notification");

var form = document.getElementById('contact_form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var _ref = [form.querySelector('#contact_name').value, form.querySelector('#contact_email').value, form.querySelector('#contact_message').value],
      name = _ref[0],
      email = _ref[1],
      message = _ref[2];
  var data = {
    name: name,
    email: email,
    message: message
  };
  form.classList.add('loading');

  _helper.http.post({
    data: data,
    url: "message",
    success: function success() {
      _notification2._notification.add({
        label: "Message sending",
        mess: 'You messages sended seccessfull :)'
      });

      form.classList.remove('loading');
    },
    error: function error() {
      _notification2._notification.add({
        label: "Message sending",
        mess: 'You messages not sended :('
      });

      form.classList.remove('loading');
    }
  });
});
},{"../helper":"assets/js/helper.js","../notification":"assets/js/notification/index.js"}],"assets/js/main.js":[function(require,module,exports) {
"use strict";

require("./navigation");

require("./notification");

require("./lazyLoad");

require("./textBracket");

require("./contacts");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import './http'
particlesJS('particles-js', {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 500
      }
    },
    color: {
      value: '#59DBD5'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#505050'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#505050',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
}); // bracket text
// lazy loading

var animationHandler =
/*#__PURE__*/
function () {
  function animationHandler(_ref) {
    var selectors = _ref.selectors;

    _classCallCheck(this, animationHandler);

    this.selectors = selectors;
    this.handle();
  }

  _createClass(animationHandler, [{
    key: "handle",
    value: function handle() {
      var _this = this;

      this.selectors.forEach(function (selector) {
        var _selector$dataset = selector.dataset,
            animate = _selector$dataset.animate,
            start = _selector$dataset.start;

        switch (start) {
          case 'load':
            document.addEventListener('DOMContentLoaded', function () {
              selector.classList.add(animate);
            });

          case 'scroll':
            window.addEventListener('scroll', function () {
              return _this.checkScroll(selector, animate);
            });

            _this.checkScroll(selector, animate);

            break;

          default:
            break;
        }
      });
    }
  }, {
    key: "checkScroll",
    value: function checkScroll(selector, animate) {
      if (selector.getBoundingClientRect().top <= document.documentElement.clientHeight) {
        selector.classList.add(animate);
      }
    }
  }]);

  return animationHandler;
}();

document.addEventListener('DOMContentLoaded', function () {
  new animationHandler({
    selectors: _toConsumableArray(document.querySelectorAll('.animated'))
  });
});
},{"./navigation":"assets/js/navigation/index.js","./notification":"assets/js/notification/index.js","./lazyLoad":"assets/js/lazyLoad/index.js","./textBracket":"assets/js/textBracket/index.js","./contacts":"assets/js/contacts/index.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44801" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","assets/js/main.js"], null)
//# sourceMappingURL=/main.cea5deef.map