# Construcción de la imagen
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

COPY ./public ./public
COPY ./src ./src
COPY ./app ./app

RUN npm install
RUN npm run build

# Producción con Node 20
FROM node:20-alpine AS runner

# Establece una variable para deshabilitar Next.js telemetry
# esto es, para evitar que Next.js envíe datos de uso a su servidor
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

# Solo copiamos lo necesario para que la aplicación funcione
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]