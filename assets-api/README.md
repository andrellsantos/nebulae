# Assets API
Microservices responsible to manage all assets in the platform.

- [Setup](#setup)


## Setup

### MongoDB

- Pull Mongo image using Docker:

```
docker pull mongo
```

- Create the docker container with MongoDB image:

```
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongodbuser -e MONGO_INITDB_ROOT_PASSWORD=mongodbpwd mongo
```

### NPM

- Run Assets API:

```
npm run dev
```
