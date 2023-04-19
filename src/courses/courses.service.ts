import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCourseDto } from './dtos/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  private courses: CourseEntity[] = [
    {
      id: 1,
      name: 'NestJs from Zero to Expert',
      description: 'from the basics to advanced concepts',
      tags: ['NestJS', 'NodeJS', 'Javascript', 'Backend', 'API'],
    },
  ];

  async findAll() {
    return await this.prisma.course.findMany({ include: { tags: true } });
  }

  async findOne(id: string) {
    // const foundCourse = await this.prisma.tags.findFirst({ where: { id : 1 } });
    const foundCourse = await this.prisma.course.findFirst({
      where: { id },
      include: { tags: true },
    });

    if (!foundCourse) {
      throw new BadRequestException('course not found');
    }

    return foundCourse;
  }

  async createCourse(courseData: CreateCourseDto) {
    const courseExists = await this.prisma.course.findFirst({
      where: {
        name: courseData.name,
      },
    });

    if (courseExists) {
      throw new BadRequestException('course already exists');
    }

    const course = await this.prisma.course.create({
      data: courseData,
    });

    return course;
  }

  async updateCourse(courseId: string, { name, description }: UpdateCourseDto) {
    const courseExists = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) {
      throw new BadRequestException('Course does not exists!');
    }

    const updatedCourse = await this.prisma.course.update({
      data: {
        ...(name && { name }),
        ...(description && { description }),
      },
      where: {
        id: courseId,
      },
    });

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
