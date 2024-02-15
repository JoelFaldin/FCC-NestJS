import { Injectable } from '@nestjs/common';

@Injectable()
export class RouteService {
    
  handleJson = (): string => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      return 'HELLO NESTJS';
    } else {
      return 'hello nestjs';
    }
  };

  getNow = () => {
    return { date: new Date().toString() };
  }

  getWord = (word: string) => {
    return { echo: word };
  }

  getNames = (firstname: string, lastname: string) => {
    return { name: `${firstname} ${lastname}` };
  }

  postData = (name: string, lastname: string) => {
    return { name: `${name}  ${lastname}` };
  }

}
