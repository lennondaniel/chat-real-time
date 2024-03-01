import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Response} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/chat')
  async Chat(@Res() res: Response) {
    const messages = await this.appService.getMessage();
    res.json(messages);
  }
}
