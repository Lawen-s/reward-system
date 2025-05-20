# Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.json과 package-lock.json만 먼저 복사해서 의존성 캐시 최적화
COPY --chown=node:node package*.json ./

RUN npm install

# 소스 코드와 환경변수 파일 복사
COPY --chown=node:node . .
COPY --chown=node:node .env.local .env.local

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]