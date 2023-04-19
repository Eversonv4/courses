import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  tags: string[];
}
