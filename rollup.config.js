import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'umd/easydate.js',
      format: 'umd',
      name: 'easyDate'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'esm/index.js',
      format: 'esm'
    }
  }
];
