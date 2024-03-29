import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsOptional()
  @ApiProperty({ required: false, default: null })
  authorId: number;

  @IsOptional()
  @ApiProperty()
  categories?: any;
}
