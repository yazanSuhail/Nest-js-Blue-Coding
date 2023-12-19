import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Url } from './url/entities/url.entity';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '',
  database: 'novo-url-base',
  entities: [Url],
  synchronize: true,
};

export default ormconfig;
