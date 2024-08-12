import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return 'Hello World!';
    }

    @Get('auth/:token')
    auth(@Param('token') token: string): Promise<boolean> {
        return this.appService.auth(token);
    }
}
