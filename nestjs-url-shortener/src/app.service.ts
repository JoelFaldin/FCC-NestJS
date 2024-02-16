import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './interfaces/url.interface';
import * as validUrl from 'valid-url';

import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {};

  async shortenUrl(url: string) {
    const isValid = validUrl.isUri(url);
    
    if (!isValid) {
      return { error: 'invalid url!' }
    } else {
      const existsUrl = await this.urlModel.findOne({ original_url: url })

      if (!existsUrl) {
        // Making a new object to save in the database:
        const count = await this.urlModel.countDocuments();
        const urlObject = new this.urlModel({
          original_url: url,
          shortened_url: count + 1
        })

        await urlObject.save();
        return { original_url: url, short_url: count + 1 }
      } else {
        return { original_url: existsUrl.original_url, short_url: existsUrl.shortened_url }
      }
    }
  }

  async searchUrl(url: string) {
    if (Number.isNaN(+url)) {
      return { error: 'Invalid url' }
    }
    const existsUrl = await this.urlModel.findOne({ shortened_url: url });

    if (existsUrl) {
      return { redirect: existsUrl.original_url };
    } else {
      return { error: 'This url does not exists in the database!' }
    }
  }
}
