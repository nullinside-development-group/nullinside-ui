set IP_ADDRESS=192.168.1.3

docker build -t nullinside-ui --build-arg BUILD_ENVIRONMENT=prod --build-arg IP_ADDRESS=%IP_ADDRESS% --progress=plain .

pause