# nebulae
Nebulae Project - An open source stock-market educational platform.

- [Setup](#setup)


## Setup

```
python3 stock_loader.py -c B3SA -f 2021 -q --all
```

### MongoDB

- Pull Mongo image using Docker:

```
docker pull mongo
```

- Create the docker container with MongoDB image:

```
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongodbuser -e MONGO_INITDB_ROOT_PASSWORD=mongodbpwd mongo
```