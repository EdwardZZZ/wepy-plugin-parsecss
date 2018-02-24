# wepy框架parsecss插件
====

### install
```base
npm i -D wepy-plugin-parsecss
```

### wepy.config.js
```js
  plugins: {
    parsecss: {
      filter: /\.(wxss|css)$/,
      // base64 
      base64Config: {
        fileLimit: 20,
        root: __dirname + '/src'
      },
      // autoprefixer
      autoprefixerConfig: {
        browsers: ['last 11 iOS versions']
      }
    }
  },
```

### base64 params
- basePath - path or array of paths to search assets
- maxSize - file size in kbytes

### autoprefixer params
<https://github.com/postcss/autoprefixer#options>
