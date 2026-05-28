FROM node:22-alpine AS build

WORKDIR /app

COPY common ./common
COPY staff-client ./staff-client

WORKDIR /app/common
RUN npm install
RUN npm run build

WORKDIR /app/staff-client
RUN npm install
RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/staff-client/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]