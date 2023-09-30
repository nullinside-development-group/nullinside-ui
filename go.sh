export IP_ADDRESS=$(/sbin/ip -o -4 addr list eno1 | awk '{print $4}' | cut -d/ -f1)

cp /secrets/certs/* nginx/filesystem/etc/nginx/certs
docker build -t nullinside-ui:latest --build-arg BUILD_ENVIRONMENT=prod --build-arg IP_ADDRESS=$IP_ADDRESS .
docker container stop nullinside-ui
docker container prune -f
docker run -d --name=nullinside-ui -p 80:80 -p 443:443 nullinside-ui:latest