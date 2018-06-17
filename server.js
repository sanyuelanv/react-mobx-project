const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const statics = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
// 等待两分钟
function takeLongTime () {
  return new Promise(resolve => {
    setTimeout(() => resolve('await two min'), 2000)
  })
}
// 配置API 路由
router.get('api/v1/topics', async (ctx) => {
  await takeLongTime()
  ctx.body = {
    data: [1, 2, 3]
  }
})
// 把路由交给前端
router.get('*', async (ctx) => {
  await ctx.render('index', {})
})
// 视图文件 & 静态文件的路径配置
const ViewConfig = {
  static: path.join(__dirname, './static'),
  view: path.join(__dirname, './views')
}
// 逻辑错误代码的捕获
const errorFunc = async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) { ctx.body = { message: status } }
  }
  catch (e) {
    console.log(`=============捕获错误=============\n${e}==============================`)
    const status = e.status || 5000
    const result = { err: status, errText: '服务器打了个盹！' }
    ctx.body = result
  }
}
const app = new Koa()
// 记录时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 配置body解析器：支持json和form表单
app.use(bodyParser())
// 配置错误处理
app.use(errorFunc)
// 配置静态文件路径
app.use(statics(ViewConfig.static, { gzip: true }))
// 配置模版文件
app.use(views(ViewConfig.view, { extension: 'ejs', index: 'default.html' }))
// 配置路由
router.use('/', router.routes(), router.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// 处理错误
app.on('error', (err) => { console.log(err) })
// 启动
app.listen(3000, '127.0.0.1')
