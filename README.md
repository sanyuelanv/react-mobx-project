## 项目更名
使用改项目可以轻松搭建react / mobx 的开发环境。
原关于```mobx```的内容可以查[这里](http://www.haodan123.com/article/7)

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
启动例子项目：
1. 前端项目：npm install 或者 yarn install 打开本地的8080端口
2. 后端部分：进入 back文件夹，执行npm start 打开本地的3000端口


## 打包  
使用```webpack v3```  
1. 在babel方面，抛弃了```babel-polyfill``` 只使用```babel-runtime```。后者与前者相比，只会把需要用到的```polyfill```打包进去，这样可以不用一次过引入整一个大的```polyfill```。但貌似两者的```polyfill```并不是等价的。如果你在用到一些ES2005的技术时候出现莫名其妙的bug。还是乖乖用回去```babel-polyfill```。  
2. 新引入一个babel插件```babel-plugin-transform-imports```。在如同```import {Route,BrowserRouter,Switch} from 'react-router-dom'```的时候，其实我们是把整个包都用到了，因此使用该插件能在打包的时候把只用到的部分打包出来。  (**抛弃**)
3. 采取Code Splitting - Libraries方式把库文件和manifest分离出来。

## react-router v4  
在```react-router v4``` 里面，分成了 ```native``` 和 ```web```版本。```web```引入```react-router-dom```即可 。在v4里面。有几个差异的地方  
1. 取消了```getComponent``` 。这时候异步加载分割的代码就需要自己写一个高阶函数去处理。参见本demo里面```app/common/component/async```的代码。这样我们能给异步加载chunk.js的时候一个过渡动画。  
2. 抽象了```BrowserRouter```出来，其实就是以前的```Router```加上了```Browserhistory```。需要注意的是```BrowserRouter```里面只能是单个组件。也就是说你需要包装一下你的```route```。  
3. ```NavLink```取代了```IndexLink```
4. 还有很多需要注意的。可以自己一一看文档
