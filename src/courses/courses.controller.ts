import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('')
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.coursesService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateCourseDto) {
    const { name, description, tags } = body;

    return await this.coursesService.createCourse({ name, description, tags });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCourseDto) {
    const { name, description, tags } = body;

    return await this.coursesService.updateCourse(id, {
      name,
      description,
      tags,
    });
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.deleteCourse(Number(id));
  }
}
