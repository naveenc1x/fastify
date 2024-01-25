import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Consumer, Kafka } from "kafkajs";

@Processor("testQueue")
export class AppProcessor {
    private kafka:Kafka
    private consumer:Consumer
    constructor(){
        this.kafka = new Kafka({ brokers: ['localhost:29092'] })
         this.consumer = this.kafka.consumer({ groupId: 'test-group' })
    }

    @Process('testQueue')
    async testjob(job: Job<unknown>) {
        console.log("test", job.data);
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: job.data as string, fromBeginning: true })
      
        await this.consumer.run({
          eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {

            for (let message of batch.messages) {
              console.log(batch.highWatermark, message.offset)
              
              resolveOffset(message.offset)
              await heartbeat()
              if (Number(batch.highWatermark) === (Number(message.offset) + 1)) {
                console.log("done1")
                 await this.consumer.disconnect()
      
              }
            }
          }
        })
    }





    
}