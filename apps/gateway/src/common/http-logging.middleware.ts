import { Injectable, NestMiddleware } from "@nestjs/common";
import * as pino from "pino-http";

@Injectable()
export class HTTPLoggingMiddleware implements NestMiddleware {
  private readonly logger: any;
  constructor() {
    this.logger = pino.pinoHttp({
      timestamp: () =>
        `",timestamp":"${new Date(Date.now()).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        })}"`,
      serializers: {
        req(req) {
          return {
            id: req.id,
            method: req.method,
            url: req.url,
          };
        },
        res(res) {
          return {
            statusCode: res.statusCode,
          };
        },
      },
    });
  }

  use(req: any, res: any, next: () => void) {
    this.logger(req, res, next);
  }
}
