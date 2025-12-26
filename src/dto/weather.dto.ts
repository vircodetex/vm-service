import { ApiProperty } from '@nestjs/swagger';

export class GetWeatherResponseDto {
    @ApiProperty({ example: 'London' })
    city: string;

    @ApiProperty({ example: 12 })
    temperature: number;

    @ApiProperty({ example: 18 })
    windspeed: number;

    @ApiProperty({ example: 'Partly cloudy' })
    description: string;
}
