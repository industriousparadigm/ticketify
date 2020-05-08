# Ticketify

![containers rainbow](https://www.bigboxcontainers.co.za/wp-content/uploads/2017/05/fremantle-rainbow-container-artwork-sculpture.jpg)

This should be a production grade application fully developed with a microservices architecture.

The juicy buzzwords associated with it are:

- Typescript
- Docker
- Kubernetes
- NextJS
- Google Cloud Platform
- MongoDB
- JWT
- NodeJS
- Express
- React
- Nginx
- Redis
- It's midnight and I need to go to bed

Some important notes that I learned the hard way: 
- In addition to the infrastucture .yaml files, the auth service needs an environment var for JWT. We add it imperatively as such: `k create secret generic jwt-secret --from-literal=JWT_KEY=<type your favorite key>`

The application is built following Stephen Grider's new [Microservices course](https://www.udemy.com/course/microservices-with-node-js-and-react). What amazing work by Mr. Grider.
