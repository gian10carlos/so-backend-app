# Usa una imagen de Node.js como base
FROM node:18-alpine

# Crea y usa el directorio de la aplicación
WORKDIR /app

# Copia los archivos de `package.json` y `package-lock.json`
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instala las dependencias
RUN npm install -g pnpm
RUN pnpm install

# Copia el resto de los archivos de tu proyecto
COPY . .

# Genera el cliente de Prisma
RUN pnpx prisma generate

# Compila la aplicación
RUN pnpm run build

# Expone el puerto que la app usará (usualmente 3000)
EXPOSE 3000

# Comando para iniciar la app
CMD ["pnpm", "run", "start:prod"]
