export interface AppDatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  syncronize?: boolean;
}

export interface AppLocationConfig {
  apiUrl: string;
  apiKey: string;
}

export interface AppHttpConfiguration {
  timeout: number;
  maxRedirects: number;
}
export interface AppConfiguration {
  port: number;
  database: AppDatabaseConfig;
  location: AppLocationConfig;
  http: AppHttpConfiguration;
}

export default (): AppConfiguration => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  location: {
    apiKey: process.env.INDONESIA_LOCATION_API_KEY,
    apiUrl: process.env.INDONESIA_LOCATION_API_URL_V2,
  },
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 5000,
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS, 10) || 5,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    syncronize: process.env.DATABASE_AUTO_SYNCRONIZE === 'true',
  },
});
