# Usamos una versión reciente de Node
FROM node:21.3.0

# Establece directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios primero (cache)
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps --loglevel=verbose

# Copia el resto de los archivos
COPY . .

# Compila la app si es build de producción
# RUN npm run build

# Comando por defecto
CMD ["npm", "run", "dev"]
