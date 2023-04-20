import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTagDto } from './dtos/create-tags.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tags.findMany();
  }

  async findOne(id: number) {
    const tagExists = await this.prisma.tags.findFirst({
      where: {
        id,
      },
    });

    if (!tagExists) {
      throw new BadRequestException('Tag not found');
    }

    return tagExists;
  }

  async createTag({ name, courseId }: CreateTagDto) {
    const tagExists = await this.prisma.tags.findFirst({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (tagExists) {
      throw new BadRequestException('Tag already exists');
    }

    const createdTag = await this.prisma.tags.create({
      data: { name: name.toLowerCase(), courseId },
    });

    return createdTag;
  }

  async updateTagName(id: string, name: string) {
    const tagExists = await this.prisma.tags.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!tagExists) {
      throw new BadRequestException('tag not found');
    }

    const updatedTagName = await this.prisma.tags.update({
      data: {
        name: name.toLowerCase(),
      },
      where: {
        id: Number(id),
      },
    });

    return updatedTagName;
  }

  async deleteTagById(id: number) {
    const tagExists = await this.prisma.tags.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!tagExists) {
      throw new BadRequestException('tag not found');
    }

    return await this.prisma.tags.delete({
      where: { id },
    });
  }
}
