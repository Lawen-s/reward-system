interface Config {
  app: AppConfig;
  mongo: MongoConfig;
}

export interface AppConfig {
  port: number;
}

export interface MongoConfig {
  uri: string;
  db: string;
  authSource: string;
}

export const config = (): Config => {
  return {
    app: {
      port: parseInt(process.env.PORT, 10),
    },
    mongo: {
      uri: process.env.MONGO_URI,
      db: process.env.MONGO_DB,
      authSource: process.env.MONGO_AUTH_SOURCE,
    },
  };
};
