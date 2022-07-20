import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  routes,
  fastRefresh: {},
  mfsu: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // 生产环境去除console日志打印
  terserOptions: {
    compress: {
      drop_console: REACT_APP_ENV === 'dev' ? false : true,
    },
  },
  targets: {
    ie: 11,
  },
  define: {
    API_URL: '',
  },
});
