// 路由压缩，为了写的方便
import combineRoutes from "koa-combine-routers"
import aroutes from "./aRouter"
import broutes from "./bRouter"
export default combineRoutes(aroutes, broutes)