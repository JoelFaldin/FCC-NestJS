import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleRoutes(date: string) {
    const newDate = new Date(date);

    if (isNaN(+date) && newDate.toString() == 'Invalid Date') {
      return { error: 'Invalid Date' };
    } else if (+date.length === 13) {
      const utc = new Date(+date).toUTCString();

      return {
        unix: +date,
        utc: utc,
      };
    } else {
      const unix = new Date(date).getTime();
      const utc = new Date(date).toUTCString();

      return { unix, utc };
    }
  }

  handleApi() {
    const unixDate = new Date().getTime();
    const utcDate = new Date().toUTCString();

    const dateObject = {
      unix: unixDate,
      utc: utcDate,
    };

    return dateObject;
  }
}
