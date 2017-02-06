var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', function (req, res, next) {
  res.json(
    {test: '测试请求！'}
  )
})

app.listen(3000, function () {
  console.log('访问：http://localhost:3000/')
})
