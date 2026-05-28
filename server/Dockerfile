FROM node:22-alpine AS build

WORKDIR /app

COPY common ./common
COPY server ./server

WORKDIR /app/common
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install
RUN npm run build


FROM node:22-alpine

WORKDIR /app/common
COPY common ./
COPY --from=build /app/common/dist ./dist

WORKDIR /app/server
COPY server ./
COPY --from=build /app/server/dist ./dist
RUN npm install --omit=dev
RUN npx prisma generate

EXPOSE 8000

CMD ["npm", "start"]