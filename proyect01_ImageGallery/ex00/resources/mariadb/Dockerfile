# Imagen del contenedor.
FROM mariadb:latest

# MariaDB Settings
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Run MariaDB
ENTRYPOINT ["/start.sh"]