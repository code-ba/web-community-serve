// 复制的这里--->https://www.npmjs.com/package/koa-jwt#example
export default ( ctx, next )=>next().catch( ( err )=>{
  if ( 401 == err.status ){
    ctx.status = 401;
    ctx.body = 'Protected resource, use Authorization header to get access\n';
  } else {
    throw err;
  }
} );