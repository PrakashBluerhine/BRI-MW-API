
const fs = require('fs');

export class CustomConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      dev_email: process.env.DEV_EMAIL,
      dev_mobile: process.env.DEV_MOBILE,
    };

    if(process.env.SSL === 'true') {
      this.envConfig.SSL = {
        rejectUnauthorized: false,
        cert: fs.readFileSync(process.env.SSL_CERTIFICATE_KEY_PATH).toString(),
      }
    } else {
      this.envConfig.SSL = false
    } 


  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
