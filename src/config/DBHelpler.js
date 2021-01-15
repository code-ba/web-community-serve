import mongoose from 'mongoose';
import config from '.';

// 创建连接
mongoose.connect( config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} );

// 连接成功
mongoose.connection.on( 'connected', ()=>{
  console.log( 'mongoose 连接成功！' );
} );

// 连接异常
mongoose.connection.on( 'error', ( err )=>{
  console.log( 'mongoose 连接异常：', err );
} );

// 断开连接
mongoose.connection.on( 'disconnected', ()=>{
  console.log( 'mongoose 断开连接' );
} );

export default mongoose;
