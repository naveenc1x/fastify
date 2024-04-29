import { Process, Processor } from '@nestjs/bull';
import Bull, { Job } from 'bull';
import { Consumer, Kafka } from 'kafkajs';

@Processor('testQueue')
export class AppProcessor {
  private kafka: Kafka;
  private consumer: Consumer;
  constructor() {
    this.kafka = new Kafka({ brokers: ['localhost:29092'] });
    this.consumer = this.kafka.consumer({ groupId: 'test-group' });
  }

  @Process('testQueue')
  async testjob(job: Job<unknown>) {
    return await this.executeJob(job);
  }

  async executeJob(job: Bull.Job) {
    console.log('executed id', job);
    return await new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log('after delay', job);
        job.moveToCompleted();

        // resolve("hi")
      }, 30),
    );
  }
}
