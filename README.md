# vue-server-template

> vue+express+webpack单页应用开发脚手架，包含vue客户端和express服务端
webpack优化点：
1.引入happypack，实现webpack多线程打包，显著提高本地打包速度
2.引入webpack DllReferencePlugin，提前打包公共代码（polyfill和vue全家桶）
3.可自我根据需要自定义调整webpack配置

## 技术栈

webpack4 + Es6 + vue + express

## 运行

```
#安装依赖
npm install

#本地开发
npm run dev

#线上运行
npm start

#访问地址
http://localhost:3200
```

## npm脚本介绍
```
#打包lib（npm install时自动调用该钩子）
npm run postinstall

#执行webpack.dll.js，打包lib
npm run build-lib

#本地运行
npm run dev

#打包客户端
npm run build-client

#client-server打包
npm run build

#使用pm2运行工程
npm run start-project

#线上运行工程
npm start

```

## 目录结构
```txt
  ├── build                       // webpack配置
  │   ├── webpack.client.js       // webpack client端打包配置
  │   ├── webpack.dll.js          // webpack DllPlugin打包配置
  │   ├── webpack.server.js       // webpack server端打包配置
  ├── lib                         // DllPlugin 相关lib
  ├── src                         // 源代码
  │   ├── client                  // client客户端源代码
  │   │  ├── assets               // 静态资源
  │   │  ├── components           // 公用组件
  │   │  ├── layout               // 布局组件
  │   │  ├── views                // 页面路由组件
  │   │  ├── stores               // mobx store，状态管理
  │   │  ├── tool                 // 通用公共函数
  │   │  ├── index.html           // html模板
  │   │  ├── main.js              // 入口
  │   ├── server                  // server 源代码
  │   │  ├── app.js               // pro环境下的server 入口
  │   │  ├── devApp.js            // dev环境下的server 入口
  │   │  └── route.js             // express路由中间件配置
  ├── static                      // 静态文件目录
  ├── babele.config.js            // babel-loader 配置
  ├── config                      // 工程全局公共配置（port、host等）
  ├── postcss.config.js           // postcss-loader 配置
  ├── .editorconfig               // 编辑器配置
  ├── .gitignore                  // git 忽略项
  ├── package-lock.json           // npm 锁文件
  ├── package.json                // npm 配置
  ├── pm2.json                    // pm2 入口
  ├── README.md                   // README 文档
```
