# Multi-stage build for optimized production image

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Disable Husky in container builds
ENV HUSKY=0

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Build frontend
RUN npm run build

# Stage 2: Build backend
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Disable Husky in container builds
ENV HUSKY=0

# Copy backend package files
COPY server/package*.json ./
COPY server/tsconfig.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy backend source
COPY server/src/ ./src/

# Build backend
RUN npm run build

# Remove devDependencies for production runtime
RUN npm prune --omit=dev

# Stage 3: Production image
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S casino -u 1001

WORKDIR /app

# Copy built backend
COPY --from=backend-builder --chown=casino:nodejs /app/dist ./dist
COPY --from=backend-builder --chown=casino:nodejs /app/node_modules ./node_modules
COPY --from=backend-builder --chown=casino:nodejs /app/package.json ./package.json

# Copy built frontend
COPY --from=frontend-builder --chown=casino:nodejs /app/dist ./public

# Create necessary directories
RUN mkdir -p /app/logs && chown casino:nodejs /app/logs
RUN mkdir -p /app/uploads && chown casino:nodejs /app/uploads

# Switch to non-root user
USER casino

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
