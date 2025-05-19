import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "./config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "user") {
  private readonly key: Buffer;
  private readonly issuer: string;
  private readonly audience: string;
  constructor(private readonly configService: ConfigService) {
    const { jws, issuer, audience } = configService.get<JwtConfig>("jwt");
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(jws.key, "base64"),
      issuer: issuer,
      audience: audience,
      algorithms: [jws.algorithm],
    });
    this.key = Buffer.from(jws.key, "base64");
    this.issuer = issuer;
    this.audience = audience;
  }

  async validate(payload: any) {
    return { id: payload.sub, role: payload.role };
  }
}
