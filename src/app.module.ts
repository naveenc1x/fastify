import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AppProcessor } from './app.processor.service';
// import { KafkaConsumerService1 } from './consumer.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'testQueue',
      useFactory: async () => ({
        name: 'testQueue',
        redis: {
          host: '127.0.0.1',
          port: 6379
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: true,
        },
        settings: {
          lockDuration: 10,
        },
      }),
    },),

  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule { }
