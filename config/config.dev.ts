// https://umijs.org/config/
//测试环境配置文件
import { defineConfig } from 'umi';
// 在config中将node的环境变量注入到define配置中
export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    API_URL: '/api',
  },
});
