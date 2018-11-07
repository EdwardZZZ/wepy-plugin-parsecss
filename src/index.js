import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import url from 'postcss-url';
import cssnano from 'cssnano';

export default class {
    constructor(config) {
        const cfg = {
            filter: /\.wxss$/,
            compress: false,
        };

        this.setting = Object.assign({}, cfg, config);
    }

    apply(op) {
        const { code, file } = op;
        const { filter, base64Config, autoprefixerConfig, compress } = this.setting;

        if (!filter.test(file)) {
            op.next();
            return;
        }

        op.output && op.output({
            action: 'parsecss',
            file,
        });

        const autoprefixerCfg = autoprefixerConfig || {};
        const { basePath, maxSize = 20 } = base64Config;
        const plugins = [autoprefixer(autoprefixerCfg)];
        if (compress) {
            plugins.push(cssnano({
                preset: 'default'
            }));
        }

        postcss(plugins)
        .use(url({
            url: "inline",
            encodeType: 'base64',
            basePath,
            maxSize,
        }))
        .process(code, { from: void 0 })
        .then(result => {
            result.warnings().forEach(function (warn) {
                console.warn(warn.toString());
            });

            op.code = result.css;
            op.next();
        });
    }
};