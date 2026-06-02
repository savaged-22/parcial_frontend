FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/parcial-frontend ./dist/parcial-frontend
EXPOSE 4000
CMD ["node", "dist/parcial-frontend/server/server.mjs"]
