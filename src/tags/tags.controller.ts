import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll() {
    return await this.tagsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagsService.findOne(Number(id));
  }

  @Post()
  async createTag(@Body() tagData: CreateTagDto) {
    const { name, courseId } = tagData;
    return await this.tagsService.createTag({ name, courseId });
  }

  @Patch(':id')
  async updateTagName(@Param('id') id: string, @Body() body: { name: string }) {
    const { name } = body;
    return await this.tagsService.updateTagName(id, name);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: string) {
    return await this.tagsService.deleteTagById(Number(id));
  }
}
