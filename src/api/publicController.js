// 验证码
import svgCaptcha from 'svg-captcha';
class PublicController{
  constructor(){ }
  async getCaptcha( ctx ){
    // const body = ctx.request.query;
    const newCaptca = svgCaptcha.create( {
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      // 干扰线
      noise: Math.floor( Math.random() * 6 ),
      width: 126,
      height: 38,
    } );
    ctx.body = {
      code: 200,
      data: newCaptca.data,
    };
  }
}
export default new PublicController();