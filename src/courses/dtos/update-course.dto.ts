// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCourseDto } from './create-course.dto';
// export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

import { IsString, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
