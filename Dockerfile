# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app/backend
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/prisma ./prisma
COPY backend/package.json ./package.json
RUN mkdir -p /app/database
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]
