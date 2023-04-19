import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Injectable()
export class CoursesService {
  private courses: CourseEntity[] = [
    {
      id: 1,
      name: 'NestJs from Zero to Expert',
      description: 'from the basics to advanced concepts',
      tags: ['NestJS', 'NodeJS', 'Javascript', 'Backend', 'API'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(courseId: number) {
    const course = this.courses.filter(
      (course) => course.id === Number(courseId),
    );
    if (course.length === 0) {
      throw new BadRequestException('course not found');
    }
    return course;
  }

  createCourse({ name, description, tags }: CreateCourseDto) {
    const id = Math.floor(Math.random() * 999999);
    const newCourse = { id, name, description, tags };
    this.courses.push(newCourse);
    return newCourse;
  }

  updateCourse(courseId: number, { name, description, tags }: UpdateCourseDto) {
    let updatedCourse = {};

    this.courses.find((course, index) => {
      if (course.id === Number(courseId)) {
        const newUpdatedCourse = {
          ...course,
          name: name ? name : course.name,
          description: description ? description : course.description,
          tags: tags ? tags : course.tags,
        };

        this.courses[index] = newUpdatedCourse;
        updatedCourse = newUpdatedCourse;
      }
    });

    if (!updatedCourse) {
      throw new HttpException('course not found', HttpStatus.NOT_FOUND);
    }

    return updatedCourse;
  }

  deleteCourse(courseId: number) {
    const filteredCourses = this.courses.filter(
      (course) => course.id !== courseId,
    );
    this.courses = filteredCourses;

    return filteredCourses;
  }
}
