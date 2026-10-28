import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity.js'],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: false,
  // Ixtiyoriy filtrlar (masalan, region) berilmasa, shart shunchaki tashlab ketiladi
  invalidWhereValuesBehavior: { undefined: 'ignore' },
};

export const AppDataSource = new DataSource(dataSourceOptions);
