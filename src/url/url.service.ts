import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  private generateShortUrl(originalUrl: string): string {
    try {
      const url = new URL(originalUrl);
      const hostParts = url.hostname.split('.');
      if (hostParts.length > 1 && hostParts[0].toLowerCase() === 'www') {
        hostParts.shift();
      }
      return hostParts.join('.') || 'default';
    } catch (error) {
      console.error('Error parsing URL:', error);
      return 'default';
    }
  }

  async createShortUrl(originalUrl: string): Promise<Url> {
    const url = new Url();
    url.originalUrl = originalUrl;
    url.shortUrl = this.generateShortUrl(originalUrl);
    await this.urlRepository.save(url);
    return url;
  }

  async getOriginalUrl(shortUrl: string): Promise<string> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    if (!url) {
      throw new NotFoundException('Short URL not found');
    }
    return url.originalUrl;
  }

  async getAllUrls(): Promise<Url[]> {
    return this.urlRepository.find();
  }
}
