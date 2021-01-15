import { getValue } from '../config/RedisConfig';

const checkCode = async( key, value )=>{
  const redisData = await getValue( key );
  if ( redisData != null ){
    // 全部转小写
    return redisData.toLowerCase() === value.toLowerCase();
  } else {
    return false;
  }
};
export { checkCode };