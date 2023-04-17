import { Injectable } from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { CourseDto } from './dtos/course.dto';

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
    if (!course) {
      return [];
    }
    return course;
  }

  createCourse({ name, description, tags }: CourseDto) {
    const id = Math.floor(Math.random() * 999999);
    const newCourse = { id, name, description, tags };
    this.courses.push(newCourse);
    return newCourse;
  }

  updateCourse(courseId: number, { name, description, tags }: CourseDto) {
    return this.courses.filter((course) => {
      if (course.id === Number(courseId)) {
        course = {
          ...course,
          name: name ? name : course.name,
          description: description ? description : course.description,
          tags: tags ? tags : course.tags,
        };

        return course;
      }
    });
  }
}
