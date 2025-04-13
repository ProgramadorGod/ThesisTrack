# Utilizamos la imagen oficial de nginx
FROM nginx:1.25

# Eliminamos el archivo de configuración predeterminado
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos el archivo de configuración personalizado
COPY nginx/default.conf /etc/nginx/conf.d/

# Exponemos el puerto 80 para acceder a la aplicación desde el exterior
EXPOSE 80
