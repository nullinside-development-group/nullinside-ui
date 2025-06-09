export IP_ADDRESS=$(/sbin/ip -o -4 addr list eno2 | awk '{print $4}' | cut -d/ -f1)

cp /secrets/certs/* nginx/filesystem/etc/nginx/certs
docker compose build --build-arg IP_ADDRESS=$IP_ADDRESS
if [ "$?" != "0" ]
then
	exit 1
fi

docker compose down
docker compose up -d
