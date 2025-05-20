# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .
COPY --chown=node:node .env.local .env.local

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]