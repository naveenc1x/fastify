import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Kafka } from 'kafkajs';


@Injectable()
export class AppService {



  getHello(): string {

    return 'Hello World!';
  }


  PostTest(req, body): void {

    console.log(body);
  }
}




