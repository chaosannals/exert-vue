import { Injectable } from '@nestjs/common';
import { CaptchaObj, create as createCaptcha } from 'svg-captcha';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  makeCaptcha(size: number = 4): CaptchaObj {
    const captcha = createCaptcha({
      size,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#f4f4f4',
    });
    return captcha
  }
}
