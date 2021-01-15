import send from '../config/mailconfig';
// 一个JavaScript日期库，用于解析，验证，操作和格式化日期。
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import config from '@/config';
import { checkCode } from '@/common/Utils';
import User from '@/model/User';
class LoginController{
  constructor(){ }
  async forget( ctx ){
    const { body } = ctx.request;
    try {
      let result = await send( {
        code: body.code || '1234',
        expire: moment().add( 30, 'minutes' ).format( 'YYYY-MM-DD HH:mm:ss' ) || '2021-11-11',
        email: body.username || '507570355@qq.com',
        user: 'Baran.Me',
      } );
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功',
      };
    } catch ( e ){
      console.log( e );
    }
  }
  async login( ctx ){
    // 接收用户的数据
    // console.log( ctx.request.query, 1111111111 ); get 可以试试这样取值
    const {body} = ctx.request;
    let sid = body.sid;
    let code = body.code;
    // 验证图片验证码的时效性、正确性
    if ( !checkCode( sid, code ) ){
      return ctx.body = {
        code: 401,
        msg: '图片验证码不正确！',
      };
    }
    // 验证用户账号密码是否正确
    // let user=await User.findOne( {
    //   username: body.username,
    // } );

    let user=await User.findOne( {
      username: body.username,
    } );
    if( user===null || user.get( 'password' )!==body.password ){
      return ctx.body = {
        code: 404,
        msg: '用户名或密码错误',
      };
    }
    const token = jsonwebtoken.sign( {
      _id: 'baran',
    }, config.JWT_SECRET, { expiresIn: '1d' },
    );
    // 返回 token
    ctx.body = {
      code: 200,
      token,
    };
  }
}
export default new LoginController();