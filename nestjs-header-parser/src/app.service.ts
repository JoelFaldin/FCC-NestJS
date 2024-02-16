import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHeaderInfo(req: any) {
    const clientIp = req.socket.remoteAddress;
    const preferredLanguage = req.headers['accept-language'];
    const reqSoftware = req.headers['user-agent'];

    return {
      ipaddress: clientIp,
      language: preferredLanguage,
      software: reqSoftware,
    };
  }
}
