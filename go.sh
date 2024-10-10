export IP_ADDRESS=$(/sbin/ip -o -4 addr list eno2 | awk '{print $4}' | cut -d/ -f1)

cp /secrets/certs/* nginx/filesystem/etc/nginx/certs
docker compose build -t nullinside-ui:latest --build-arg BUILD_ENVIRONMENT=prod --build-arg IP_ADDRESS=$IP_ADDRESS .
docker compose down
docker compose up -d
