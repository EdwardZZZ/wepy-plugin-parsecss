(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('postcss'), require('autoprefixer'), require('postcss-url')) :
    typeof define === 'function' && define.amd ? define(['babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'postcss', 'autoprefixer', 'postcss-url'], factory) :
    (global.module = factory(global._Object$assign,global._classCallCheck,global._createClass,global.postcss,global.autoprefixer,global.url));
}(this, (function (_Object$assign,_classCallCheck,_createClass,postcss,autoprefixer,url) { 'use strict';

_Object$assign = 'default' in _Object$assign ? _Object$assign['default'] : _Object$assign;
_classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
_createClass = 'default' in _createClass ? _createClass['default'] : _createClass;
postcss = 'default' in postcss ? postcss['default'] : postcss;
autoprefixer = 'default' in autoprefixer ? autoprefixer['default'] : autoprefixer;
url = 'default' in url ? url['default'] : url;

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        this.setting = _Object$assign({}, cfg, config);
    }

    _createClass(_class, [{
        key: 'apply',
        value: function apply(op) {
            var code = op.code,
                file = op.file;
            var _setting = this.setting,
                filter = _setting.filter,
                base64Config = _setting.base64Config,
                autoprefixerConfig = _setting.autoprefixerConfig;


            if (!filter.test(file) || code === null) {
                op.next();
                return;
            }

            op.output && op.output({
                action: 'parsecss',
                file: file
            });

            var autoprefixerCfg = autoprefixerConfig || {};
            var basePath = base64Config.basePath,
                _base64Config$maxSize = base64Config.maxSize,
                maxSize = _base64Config$maxSize === undefined ? 20 : _base64Config$maxSize;

            postcss([autoprefixer(autoprefixerCfg)]).use(url({
                url: "inline",
                encodeType: 'base64',
                basePath: basePath,
                maxSize: maxSize
            })).process(code, { from: void 0 }).then(function (result) {
                result.warnings().forEach(function (warn) {
                    console.warn(warn.toString());
                });

                op.code = result.css;
                op.next();
            });
        }
    }]);

    return _class;
}();

return _class;

})));
