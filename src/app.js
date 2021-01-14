import Koa from "koa"
import path from "path"
// Koa的路由器中间件。
import Router from "koa-router"
// 安全头
import helmet from "koa-helmet"
// 静态资源的服务
import koaStatic from "koa-static"
// 路由
import router from "./routes/routes"
// 功能齐全的koa正文解析器中间件。支持multipart，urlencoded和json请求机构。提供与Express的bodyParser-相同的功能multer。
import koaBody from "koa-body"
// JSON精美打印的响应中间件。还将节点对象流转换为二进制。
import koaJson from "koa-json"
// KOA的跨域资源共享（CORS）
import koaCors from "@koa/cors"
// 整合 KOA 的中间件
import koaCompose from "koa-compose"

const app = new Koa()

const middleware = koaCompose([
  koaBody(),
  koaStatic(path.join(__dirname, "../public")),
  koaCors(),
  koaJson({ pretty: false, param: "pretty" }),
  helmet()
])
app.use(middleware)
app.use(router())

// app.use(helmet())
// app.use(statics(path.join(__dirname, "../public")))
// app.use(router())

// // allowedMethods 可参考 https://github.com/koajs/router/blob/56735f009768e32cce89af60337e7e2a8d6bbbc4/history.md
// app.use(router.routes())
//   .use(router.allowedMethods());
app.listen(3000)