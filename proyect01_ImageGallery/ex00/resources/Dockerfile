# Imagen del contenedor.
FROM nginx:latest

COPY . /usr/share/nginx/html
EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]