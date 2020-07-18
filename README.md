# node-app
A basic NodeJS REST application for CRUD operations on an entity using Mongo DB

There are 2 ways to run the appliactions- 

1. Using Docker stacks 

- Initialise a docker swarm and run the following command 
- `docker stack deploy -c crud-service-app.yml <stack_name>`

2. Using npm

- Keep a mongo db instance at port 27017
- If mongo db instance is somewhere else, update the configurations in app/config/db.config.js and app/database/mongo.js accordingly
- Run `npm install && npm start`
