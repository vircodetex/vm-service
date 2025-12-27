import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetPeopleResponseDto } from './dto/people.dto';
import { GetWeatherResponseDto } from './dto/weather.dto';
import { CityQueryDto } from './dto/city-query.dto';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

@Controller()
@ApiTags('vm-service')
@ApiExtraModels(CityQueryDto)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('people')
  @ApiOkResponse({ type: GetPeopleResponseDto })
  @ApiQuery({ name: 'city', required: true, schema: { $ref: getSchemaPath(CityQueryDto) } })
  getPeople(@Query(new ValidationPipe({ transform: true })) query: CityQueryDto): GetPeopleResponseDto {
    return this.appService.getPeople(query.city);
  }

  @Get('weather')
  @ApiOkResponse({ type: GetWeatherResponseDto })
  @ApiQuery({ name: 'city', required: true, schema: { $ref: getSchemaPath(CityQueryDto) } })
  getWeather(@Query(new ValidationPipe({ transform: true })) query: CityQueryDto): GetWeatherResponseDto {
    return this.appService.getWeather(query.city);
  }

  @Get('schema')
  getSchema(): any {
    const path = join(process.cwd(), 'openapi.json');
    if (!existsSync(path)) {
      return { error: 'openapi.json not found' };
    }
    const raw = readFileSync(path, 'utf8');
    return JSON.parse(raw);
  }
}
