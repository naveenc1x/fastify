import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("testQueue")
export class AppProcessor {
    @Process('testQueue')
    testjob(job: Job<unknown>) {
        console.log("test", job.data);
    }
}