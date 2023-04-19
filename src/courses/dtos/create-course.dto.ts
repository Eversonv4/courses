import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
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
