import { ApiProperty } from '@nestjs/swagger';

export class GetPeopleResponseDto {
    @ApiProperty({ example: 'London' })
    city: string;

    @ApiProperty({ example: 8900000 })
    population: number;

    @ApiProperty({ example: '2024' })
    population_year: string;
}
