# wepy框架parsecss插件

### install
```base
npm i -D wepy-plugin-parsecss
```

### wepy.config.js
```js
  plugins: {
    parsecss: {
      // base64 
      base64Config: {
        maxSize: 20,
        basePath: __dirname + '/bgimages'
      },
      // autoprefixer
      autoprefixerConfig: {
        browsers: ['last 11 iOS versions']
      }
    }
  },
```

### base64 params
- basePath
-- path to put bg-images
-- path to search assets

- maxSize 
-- file size in kbytes

### autoprefixer params
<https://github.com/postcss/autoprefixer#options>


