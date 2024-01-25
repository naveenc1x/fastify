import { Injectable } from "@nestjs/common";
import { Consumer, Kafka } from "kafkajs";

@Injectable()
export class KafkaConsumerService {
  private kafka: Kafka
  private consumer: Consumer
  constructor() {
    this.kafka = new Kafka({ brokers: ['localhost:29092'] })
    this.consumer = this.kafka.consumer({ groupId: 'test-group1' })
  }

  async consume(id: string) {

    try {
      const topic = `c-${id}`
      console.log("topic", topic);

      await this.consumer.connect()

      await this.consumer.subscribe({ topic: topic, fromBeginning: true })

      await this.consumer.run({
        eachBatch: async ({ batch, resolveOffset, heartbeat }) => {

          for (let message of batch.messages) {
            console.log(message.value.toString())

            resolveOffset(message.offset)
            await heartbeat()
            if (Number(batch.highWatermark) === (Number(message.offset) + 1)) {
              console.log("done1")
              this.dissconnect()
            }
          }

        }
      })


      this.consumer.on("consumer.connect", () => {
        console.log("connnected")
      })

      
    }
    catch (e) {
      console.log(e)
      await this.dissconnect()
      this.consumer.on("consumer.disconnect", () => {
        console.log("disconnected")
        console.log(id)
      })
      this.consume(id)
    }

  }

  dissconnect = async () => {
    await this.consumer.stop()
    await this.consumer.disconnect();
  };
}

//kafkajs-7c458412-8146-421d-96bb-e4f7fe90ada9
//kafkajs-daec2bdd-9b62-4d6d-ab0a-f1dccb583ead