import { BadRequestException, Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/add')
  addjob() {
    this.appService.addjob();
  }
  @Get('/adds')
  addjobs() {
    this.appService.add();
  }
  @Get('/remove')
  remove() {
    this.appService.removejob();
  }
  @Get('/removeall')
  removeA() {
    this.appService.removeAlljob();
  }



}
