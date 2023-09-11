export interface AppDatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  syncronize?: boolean;
}

export interface AppConfiguration {
  port: number;
  database: AppDatabaseConfig;
}

export default (): AppConfiguration => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    syncronize: process.env.DATABASE_AUTO_SYNCRONIZE === 'true',
  },
});
