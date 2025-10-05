# Etapa 1: Construire
FROM node:18-alpine AS builder

WORKDIR /app

# Copiază package files
COPY package*.json ./

# Instalează dependențele
RUN npm ci

# Copiază tot codul sursă
COPY . .

# Construiește aplicația Next.js
RUN npm run build

# Etapa 2: Producție
FROM node:18-alpine AS runner

WORKDIR /app

# Setează variabila de mediu
ENV NODE_ENV=production

# Creează user non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiază fișierele necesare din etapa de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Schimbă ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]