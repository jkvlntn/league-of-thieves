FROM node:22-alpine AS build

WORKDIR /app

COPY common ./common
COPY client ./client

WORKDIR /app/common
RUN npm install
RUN npm run build

WORKDIR /app/client
RUN npm install
RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/client/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]