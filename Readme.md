## Airtime server

To launch the project run this command : docker...

docker build . -t 301102/airtime-back
docker run -p 5000:8080 301102/airtime-back

docker ps
docker logs [container id]
docker system prune