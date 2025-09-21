# Imagen base (slim) con Node 20
FROM node:20-slim

# Dependencias del sistema que Prisma suele requerir
RUN apt-get update -y && apt-get install -y openssl

# Carpeta de trabajo
WORKDIR /app

# Primero copiamos manifiestos para cachear instalación
COPY package*.json ./

# Instalación de dependencias
RUN npm install

# Copiamos esquemas y migraciones de Prisma
COPY prisma ./prisma/

# Generamos el cliente de Prisma en build-time
RUN npx prisma generate

# Copiamos el resto del código
COPY . .

# Puerto donde expone el servidor
EXPOSE 3000

# Comando por defecto (tu script "dev" del package.json)
CMD ["npm", "run", "dev"]
