import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TagsService } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoursesModule, TagsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
