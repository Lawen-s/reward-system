interface Config {
  app: AppConfig;
  jwt: JwtConfig;
}

export interface AppConfig {
  port: number;
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
