import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CityQueryDto {
    @ApiProperty({ example: 'London' })
    @IsString()
    @IsNotEmpty()
    city: string;
}
