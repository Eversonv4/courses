import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { PrismaService } from 'src/database/PrismaService';
import { TagsController } from './tags.controller';

@Module({
  providers: [TagsService, PrismaService],
  controllers: [TagsController],
})
export class TagsModule {}
