# ---------- Build Stage ----------
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source & build
COPY . .
RUN npm run build

# ---------- Runtime Stage ----------
FROM node:18-alpine
WORKDIR /app

# Install static server
RUN npm install -g serve

# Copy build output
COPY --from=build /app/build ./build

# Expose port
EXPOSE 8080

# Start static server
CMD ["serve", "-s", "build", "-l", "8080"]
