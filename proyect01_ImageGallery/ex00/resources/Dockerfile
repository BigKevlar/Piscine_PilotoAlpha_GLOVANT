# Imagen del contenedor.
FROM nginx

COPY . /usr/share/nginx/html
EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]