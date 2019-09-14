const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  // 使用@代替src目录路径，_c代替src/components路径
    chainWebpack: config => {
      config.resolve.alias
        .set("@", resolve("src"))
        .set("_c", resolve("src/components"));
    },
    devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: {
        '/api': {
          target: 'http://localhost:5000/api/', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    publicPath: './'
  }