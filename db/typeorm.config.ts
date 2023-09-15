import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';

configDotenv({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
});

export const dataSource = new DataSource({
  type: 'postgres', // Change to your database type
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  synchronize: process.env.DATABASE_AUTO_SYNCRONIZE === 'true',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
});
