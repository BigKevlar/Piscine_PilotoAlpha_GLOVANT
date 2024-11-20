# Imagen del contenedor.
FROM mariadb:latest

# MariaDB Settings
RUN mkdir -p /var/run/mysqld
RUN chmod 777 /var/run/mysqld
RUN chown -R mysql:mysql /var/lib/mysql

COPY start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]