(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('postcss'), require('autoprefixer'), require('postcss-url')) :
    typeof define === 'function' && define.amd ? define(['postcss', 'autoprefixer', 'postcss-url'], factory) :
    (global.module = factory(global.postcss,global.autoprefixer,global.url));
}(this, (function (postcss,autoprefixer,url) { 'use strict';

postcss = 'default' in postcss ? postcss['default'] : postcss;
autoprefixer = 'default' in autoprefixer ? autoprefixer['default'] : autoprefixer;
url = 'default' in url ? url['default'] : url;

var index = class {
    constructor(config) {
        const cfg = {
            filter: /\.wxss$/
        };

        this.setting = Object.assign({}, cfg, config);
    }

    apply(op) {
        const { code, file } = op;
        const { filter, base64Config, autoprefixerConfig } = this.setting;

        if (!filter.test(file)) {
            op.next();
            return;
        }

        op.output && op.output({
            action: 'parsecss',
            file
        });

        const autoprefixerCfg = autoprefixerConfig || {};
        const { basePath, maxSize = 20 } = base64Config;
        postcss([autoprefixer(autoprefixerCfg)]).use(url({
            url: "inline",
            encodeType: 'base64',
            basePath,
            maxSize
        })).process(code, { from: void 0 }).then(result => {
            result.warnings().forEach(function (warn) {
                console.warn(warn.toString());
            });

            op.code = result.css;
            op.next();
        });
    }
};

return index;

})));
