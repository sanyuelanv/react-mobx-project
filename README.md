## react手脚架

## 项目架构：
```
├── common
│   ├── component
│   │   ├── async
│   │   │   ├── css.css
│   │   │   ├── index.js
│   │   │   └── loading.js
│   │   ├── error
│   │   │   ├── css.css
│   │   │   └── index.js
│   │   └── nav
│   │       ├── css.css
│   │       └── index.js
│   └── css
│       └── css.css
├── image
│   └── icon.svg
├── main.js
├── router
│   ├── home
│   │   ├── css.css
│   │   └── index.js
│   ├── index.js
│   └── user
│       ├── css.css
│       └── index.js
└── stores
    ├── clickTimesStore.js
    ├── fetchStore.js
    └── index.js
```

## 说明
启动例子项目：npm install 或者 yarn install 打开本地的8080端口
1. 更新一系列依赖版本，react升级到16版。
2. 把导航栏组件移到可常驻的路由外层。
3. 增加load view 以及 对应的store
4. 移除模拟后台，使用cnode 的API进行模拟数据加载
5. css/image完成移进app项目里面
6. 使用postcss，自动补全前缀


## babel-plugin说明
1. babel-plugin-syntax-dynamic-import : 支持按需加载路由组件
2. babel-plugin-transform-class-properties / babel-plugin-transform-decorators-legacy : 使用mobx需要用到
