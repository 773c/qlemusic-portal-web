const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  devServer: {
    proxy: {//配置跨域
      '/apis': {
        target: 'http://pv.sohu.com',//搜狐的域名
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/apis': ''//请求的时候使用这个api就可以
        }
      }
    }
  }
}


