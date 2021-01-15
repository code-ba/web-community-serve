// 路由压缩，为了写的方便
import combineRoutes from 'koa-combine-routers';
import pulicRouter from './pulicRouter';
import loginRouter from './loginRouter';
export default combineRoutes( pulicRouter, loginRouter );