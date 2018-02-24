import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import url from 'postcss-url';

export default class {
    constructor(config) {
        const cfg = {
            filter: /\.wxss$/,
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
            file,
        });

        const autoprefixerCfg = autoprefixerConfig || {};
        const { basePath, maxSize = 20 } = base64Config;
        postcss([ autoprefixer(autoprefixerCfg) ])
            .use(url({
                url: "inline",
                encodeType: 'base64',
                basePath,
                maxSize,
            }))
            .process(code)
            .then(result => {
                result.warnings().forEach(function (warn) {
                    console.warn(warn.toString());
                });

                op.code = result.css;
                op.next();
            });
    }
};