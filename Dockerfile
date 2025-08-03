# Use Node 20 (compatible with Vite, react-router 7, etc.)
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./

# Optional: fix network issues during install
RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

RUN npm run build

# Serve using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
