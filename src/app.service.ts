import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Kafka } from 'kafkajs';
import * as moment from 'moment';
import { KafkaConsumerService } from './kafka-consumer.service';


@Injectable()
export class AppService {
  private kafka: Kafka
  constructor(@InjectQueue('testQueue') private readonly queue: Queue,
    private consumerService: KafkaConsumerService) {
    this.kafka = new Kafka({ brokers: ['localhost:29092'] })
  }


  getHello(): string {
    return 'Hello World!';
  }

  async addjob(): Promise<void> {

    const job = await this.queue.add('testQueue', 'c-1', { delay: 5000 });

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

  async consume(id) {

    await this.consumerService.consume(`c-${id}`)
  }


}




