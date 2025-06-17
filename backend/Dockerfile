FROM node:20-alpine AS build
WORKDIR /app
COPY . .
COPY ./prisma/seed.ts ./src
RUN npm ci
RUN npm run build


FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./package.json
RUN mkdir -p /app/database
EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/seed.js && node dist/main.js"]
