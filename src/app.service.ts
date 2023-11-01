import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import * as moment from 'moment';


@Injectable()
export class AppService {
  constructor(@InjectQueue('testQueue') private readonly queue: Queue) {
  }


  getHello(): string {
    return 'Hello World!';
  }

  async addjob(): Promise<void> {

    const job = await this.queue.add('testQueue', 'test', { repeat: { cron: '45 12 * * *' } });

    console.log("addjob", job.id)
    return
  }

  async add(): Promise<void> {
    const job = await this.queue.add({ test: 'test' }).catch((e) => {
      console.log(e)
    });
    console.log("addjob", job)
    return
  }

  async removejob(): Promise<void> {

    const remove = await this.queue.removeJobs('10')

  }

  async removeAlljob(): Promise<void> {
    const rm = await this.queue.obliterate()
    console.log('removed ')
  }



}




