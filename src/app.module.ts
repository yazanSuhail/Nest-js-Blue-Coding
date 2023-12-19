import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UrlModule } from './url/url.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
