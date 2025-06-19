FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN echo "VITE_API_URL=http://localhost:3000/integrations" > .env
RUN npm run build

FROM nginx:alpine as runtime
WORKDIR /app
COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

