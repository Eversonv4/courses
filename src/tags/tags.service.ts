import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TagsService {
  constructor(private prism: PrismaService) {}

  async findAll() {
    return await this.prism.tags.findMany();
  }
}
