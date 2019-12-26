# 使用 openssl 生成 https 服务器证书

```bash
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

# writing RSA key
openssl rsa -passin pass:x -in server.pass.key -out server.key

rm server.pass.key

openssl req -new -key server.key -out server.csr

openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

使用 koa 搭建 https 服务器

```js
const fs = require('fs')
const Koa = require('koa')
const http = require('http')
const https = require('https')
const logger = require('koa-logger')

const app = new Koa()

app.use(koqLogger())

app.use(async (ctx, next) => {
  ctx.body = 'hello koa'
  await next()
})

const options = {
  key: fs.readFileSync('./server.key'), //ssl文件路径
  cert: fs.readFileSync('./server.crt') //ssl文件路径
}

http.createServer(app.callback()).listen(80)
https.createServer(options, app.callback()).listen(443)

console.log('app listen in 80 and 443')
```
