import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateMovieDto {
  @ApiProperty({ description: 'Título de la película', example: 'Avengers: Endgame' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Duración en minutos', example: 181 })
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  duration: number

  @ApiProperty({ description: 'Sinopsis de la película', required: false })
  @IsString()
  @IsOptional()
  synopsis?: string

  @ApiProperty({ description: 'Clasificación de la película', example: 'PG-13', required: false })
  @IsString()
  @IsOptional()
  classification?: string

  @ApiProperty({ description: 'Género de la película', example: 'Acción', required: false })
  @IsString()
  @IsOptional()
  genre?: string

  @ApiProperty({ description: 'URL de la imagen de la película', required: false })
  @IsOptional()
  imageUrl?: string
}
