# Build the Angular application
FROM node:18.16-alpine AS builder

WORKDIR /app

COPY my-app/package.json my-app/package-lock.json ./
RUN npm ci

COPY . .
RUN cd my-app && npm run build --prod

# Serve the Angular application
FROM nginx:1.21-alpine

COPY --from=builder /app/my-app/dist/my-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
