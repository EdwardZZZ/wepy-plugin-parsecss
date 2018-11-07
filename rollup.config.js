import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  dest: 'index.js',
  format: 'cjs',
  moduleName: 'module',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    nodeResolve({
      browser: false,
    }),
  ],
  external: [
    'postcss',
    'autoprefixer',
    'postcss-url',
    'cssnano',
  ]
};