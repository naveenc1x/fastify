import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/webhook')
  async PostTest(@Req() req, @Body() body): Promise<void> {
    await this.appService.PostTest(req, body);
  }
}
