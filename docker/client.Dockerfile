FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run --workspace=apps/client build


FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/apps/client/.next .next
COPY --from=builder /app/apps/client/public ./public
COPY --from=builder /app/apps/client/package.json ./package.json
COPY --from=builder /app/apps/client/next.config.js ./next.config.js
COPY --from=builder /app/apps/client/.env.local .env.local
COPY --from=builder /app/packages ./packages

RUN npm install --omit=dev

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
