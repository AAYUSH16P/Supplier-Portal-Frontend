FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "server.js"]
