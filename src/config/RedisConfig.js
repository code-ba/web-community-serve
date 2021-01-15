import redis from 'redis';
import config from '.';
const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  // 	如果设置为true，则答复将作为缓冲区发送到回调。使用此选项，您可以基于return_buffers每个命令在缓冲区和字符串之间切换，而适用于客户端上的每个命令。注意：这在pubsub模式下无法正常工作。订户必须始终返回字符串或缓冲区。
  detect_buffers: true,
  // https://www.npmjs.com/package/redis 复制粘贴来的
  retry_strategy: function( options ){
    if ( options.error && options.error.code === 'ECONNREFUSED' ){
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error( 'The server refused the connection' );
    }
    if ( options.total_retry_time > 1000 * 60 * 60 ){
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error( 'Retry time exhausted' );
    }
    if ( options.attempt > 10 ){
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min( options.attempt * 100, 3000 );
  },
};
const client = redis.createClient( options );
client.on( 'error', ( err )=>console.log( 'Redis Client Error：' + err ) );
const setValue = ( key, value )=>{
  if ( typeof value === 'undefined' || value == null || value === '' ){
    return;
  }
  if ( typeof value === 'string' ){
    return client.set( key, value );
  } else if ( typeof value === 'object' ){
    // {key1:val1,key2:val2}
    // Object.keys(value) ==> [key1,key2]
    Object.keys( value ).forEach( ( item )=>{
      client.hset( key, item, value[item], redis.print );
    } );
  }
  
};

/**
 * v8 Promisify 方法，必须 node 大于 8
 */
import { promisify } from 'util';
const getValue = ( key )=>promisify( client.get ).bind( client )( key );
const getHValue = ( key )=>promisify( client.hgetall ).bind( client )( key );
// const getValue = ( key )=>client.getAsync( key ); // getAsync 报错 undefined
// const getHValue = ( key )=>client.hgetallAsync( key );
const delValue = ( key )=>{
  client.del( key, ( err, res )=>{
    if ( res === 1 ){
      console.log( '删除成功！' );
    } else {
      console.log( '删除失败：' + err );
    }
  } );
};

/**
setValue('name', '张三')
setValue('other', {
  age: 20,
  emain: 'me@qq.com'
})
getValue('name').then(res => {
  console.log('val：' + res)
})
getValue('other').then(res => {
  console.log('val：' + JSON.stringify(res, null, 2))
})
delValue('name')
 */

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue,
};