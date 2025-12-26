import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('people')
  getPeople(@Query('city') city = 'Unknown'): { city: string; people: number } {
    return this.appService.getPeople(city);
  }

  @Get('weather')
  getWeather(
    @Query('city') city = 'Unknown',
  ): { city: string; temperatureC: number; windSpeedKph: number; description: string } {
    return this.appService.getWeather(city);
  }
}
