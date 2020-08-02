
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  outputPath: 'build',
  publicPath: './',
  base: './',
  history: 'hash',
  // 配置webpack
  chainWebpack(config,{webpack}) {
    config.module.rule('js').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    config.module.rule('eslint').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    config.module.rule('graphql').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    config.module.rule('stylus-in-node_modules').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    config.module.rule('sass-in-node_modules').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    config.module.rule('less-in-node_modules').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    config.module.rule('css-in-node_modules').exclude.add("/db/").add("/config/").add("/electron/").add("/build/")
    // .exclude("/node_modules/","/dist/")css-in-node_modules
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'myapp2',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
