## react手脚架

## 项目架构：
```
├── common //公用
│   ├── component   //组件
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
│   └── css  //样式
│       └── css.css
├── image  //素材图片。建议组件的ICON类的跟着组件走，而素材类的放在这里
│   └── icon.svg
├── main.js //  主入口
├── console.js // 开发环境使用移动端的Vconsole
├── router  // 路由组件
│   ├── home  //每一个路由也是一个组件
│   │   ├── css.css
│   │   └── index.js
│   ├── index.js //路由出口
│   └── user //每一个路由也是一个组件
│       ├── css.css
│       └── index.js
└── stores // 数据流处理
    ├── clickTimesStore.js  //每一块数据为一个类
    ├── fetchStore.js
    ├── loadStore.js
    └── index.js  //数据流出口
```
## 2018-6-4 更新
1. 升级webpack 4
2. 优化开发环境：  
    1. 自动识别本地 `IP` ,开发模式下会自动打开页面   
    2. 把模版文件 ```index.html`` 跟随开发文件夹  
    3. 自动删除旧的打包文件 
3. 使用   代替 `babel-runtime`
4. 使用 ```url-loader``` 处理图片，小于25K的打包进去 JS 文件
5. 强化开发规则，强烈建议使用 ```vscode``` 来开发，便于使用 ```eslint``` 的相关功能，并且打开一下功能
    ```JSON
        "eslint.autoFixOnSave": true,
    ```
6. 验证 `propTypes` ， 优化开发规范


## 2017-12-12 更新
1. 升级一下所有依赖
2. 使用```babel-preset-env```取代``` es2015, es2016, es2017, latest```等插件
3. 把```babel```的配置文件写入```package.json```去
4. 增加```Vconsole```到开发环境。
5. 开发环境下使用```proxy``` 转发请求。


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
