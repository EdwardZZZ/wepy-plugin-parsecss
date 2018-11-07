'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));
var autoprefixer = _interopDefault(require('autoprefixer'));
var url = _interopDefault(require('postcss-url'));
var cssnano = _interopDefault(require('cssnano'));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        var cfg = {
            filter: /\.wxss$/,
            compress: false
        };

        this.setting = Object.assign({}, cfg, config);
    }

    _createClass(_class, [{
        key: 'apply',
        value: function apply(op) {
            var code = op.code,
                file = op.file;
            var _setting = this.setting,
                filter = _setting.filter,
                base64Config = _setting.base64Config,
                autoprefixerConfig = _setting.autoprefixerConfig,
                compress = _setting.compress;


            if (!filter.test(file)) {
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

            var plugins = [autoprefixer(autoprefixerCfg)];
            if (compress) {
                plugins.push(cssnano({
                    preset: 'default'
                }));
            }

            postcss(plugins).use(url({
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

module.exports = _class;
