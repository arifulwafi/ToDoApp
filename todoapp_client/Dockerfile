# ---- Stage 1: Build Vite App ----
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build production files
RUN yarn build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine

# Install openssl for self-signed cert
RUN apk add --no-cache openssl

# SSL directory
RUN mkdir -p /etc/nginx/ssl

# Generate self-signed SSL cert
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/nginx-selfsigned.key \
    -out /etc/nginx/ssl/nginx-selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]