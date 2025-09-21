# Aca vamos a definir la receta basicamente de que debe ejecutar al hacer una imagen
# Solo se rehace cuando cambia package.json, no reinstala todo
# Imagen base liviana con Node 20 (segura y rápida de construir)
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos sólo manifiestos de dependencias para aprovechar la cache
COPY package*.json ./

# Instalamos dependencias en la imagen (no copiamos node_modules desde host)
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# El dev server de Vite escucha en 5173
EXPOSE 5173

# Arrancamos Vite escuchando en todas las interfaces del contenedor
CMD ["npm", "start"]
