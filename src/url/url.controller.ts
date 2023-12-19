import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async createShortUrl(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
    const url = await this.urlService.createShortUrl(createUrlDto.originalUrl);
    return url;
  }

  @Get(':shortUrl')
  async getOriginalUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ originalUrl: string }> {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
    return { originalUrl };
  }

  @Get()
  async getAllUrls(): Promise<{ urls: Url[] }> {
    const urls = await this.urlService.getAllUrls();
    return { urls };
  }
}
