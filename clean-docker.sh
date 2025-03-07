docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker network rm $(docker network ls | grep "bridge\|host\|none" -v | awk '{print $1}')
docker builder prune -a -f
docker system prune -a -f --volumes
