## react手脚架

## 项目架构：
```
├── app  // 前端开发项目
│   ├── common
│   │   ├── component
│   │   │   ├── async
│   │   │   │   ├── css.css
│   │   │   │   ├── index.js
│   │   │   │   └── loading.js
│   │   │   ├── error
│   │   │   │   ├── css.css
│   │   │   │   └── index.js
│   │   │   ├── load
│   │   │   │   ├── css.css
│   │   │   │   └── index.js
│   │   │   └── nav
│   │   │       ├── css.css
│   │   │       └── index.js
│   │   └── css
│   │       └── css.css
│   ├── console.js
│   ├── image
│   │   ├── big.jpg
│   │   └── icon.svg
│   ├── index.html
│   ├── main.js
│   ├── router
│   │   ├── home
│   │   │   ├── css.css
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── user
│   │       ├── css.css
│   │       └── index.js
│   └── stores
│       ├── clickTimesStore.js
│       ├── fetchStore.js
│       ├── index.js
│       └── loadStore.js
├── manifestInLine.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── server.js  // 服务启动
├── views
│   └── index.ejs
├── webpack.config.js
└── webpack.production.config.js
```
## 2018-6-17 更新
1. 升级webpack 4
2. 优化开发环境：  
    1. 自动识别本地 `IP` ,开发模式下会自动打开页面   
    2. 模版文件 `index.html` 跟随开发文件夹  
    3. 自动删除旧的打包文件 
3. 使用 `babel-polyfill` 代替 `babel-runtime`
4. 使用 ```url-loader``` 处理图片，小于25K的打包进去 `JS` 文件
5. **优化开发规范**，验证 `propTypes` ；**强化开发规则**，强烈建议使用 ```vscode``` 来开发，便于使用 ```eslint``` 的相关功能，并且打开以下功能  
    ```JSON
        "eslint.autoFixOnSave": true,
    ```
6. 打包写入 ```koa``` 搭建的服务器内。其中静态文件写入 `static` , 而 `html` 写入 `view/index.ejs`
7. `npm run server` 即可启动服务器 , 打开 `http://localhost:3000/` 可看到效果
8. 前端开发启动：`npm install` 或者 ` yarn install` 打开 `http://localhost:8080/`
9. 如有问题，可以进入QQ群进行交流：798527244

## 2017-12-12 更新
1. 升级一下所有依赖
2. 使用```babel-preset-env```取代``` es2015, es2016, es2017, latest```等插件
3. 把```babel```的配置文件写入```package.json```去
4. 增加```Vconsole```到开发环境。
5. 开发环境下使用```proxy``` 转发请求。


## 说明
启动例子项目：`npm install` 或者 ` yarn install` 打开本地的8080端口
1. 更新一系列依赖版本，`react` 升级到16版。
2. 把导航栏组件移到可常驻的路由外层。
3. 增加load view 以及 对应的store
4. 移除模拟后台，使用cnode 的API进行模拟数据加载
5. css/image完成移进app项目里面
6. 使用postcss，自动补全前缀


## babel-plugin说明
1. babel-plugin-syntax-dynamic-import : 支持按需加载路由组件
2. babel-plugin-transform-class-properties / babel-plugin-transform-decorators-legacy : 使用mobx需要用到
