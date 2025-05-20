interface Config {
  app: AppConfig;
  mongo: MongoConfig;
  jwt: JwtConfig;
}

export interface AppConfig {
  port: number;
}

export interface MongoConfig {
  uri: string;
  db: string;
  authSource: string;
}

export interface JwtConfig {
  issuer: string;
  audience: string;
  jws: JwsConfig;
}

export interface JwsConfig {
  key: string;
  algorithm: string;
  expiresIn: string;
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
    jwt: {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      jws: {
        key: process.env.JWS_KEY_BASE64,
        algorithm: process.env.JWS_ALGORITHM,
        expiresIn: process.env.JWS_EXPIRATION,
      },
    },
  };
};
