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

Some notes, mostly for my own reference when setting up in a different machine:

### ENV variables

In addition to the infrastucture .yaml files, the auth service needs an environment var for JWT. We add it imperatively as such: `k create secret generic jwt-secret --from-literal=JWT_KEY=<a key you fancy>`

### Google Cloud / Kubernetes / Ingress-nginx

**GCP**: In a new machine, download and install the gcloud SDK, and select your project and zone as default.

**Ingress-nginx**: Follow the steps pertaining to Google Cloud in Kubernetes Ingress-nginx.

**Hosts file**: From GCP dashboard, find `Network Services` -> `Load Balancing`, open the current instance and copy the IP address there. This is the address to access your Kubernetes world.

Then open your `/etc/hosts` file and add this line to alias a normal URL to your application: `35.242.133.72 <your site's fictitious url>`. The url should be in the format `ticketing.dev`.

**GCP default credentials**: You may need to run this line before Skaffold can run: `gcloud auth application-default login`.

Now we can finally launch Skaffold via `skaffold dev` from our project's root.

**NOTE**: If using Kubernetes via GCC, real money (or GCC credit) is spent. A way to curb this is to reduce the Kubernetes Cluster size to zero when not using the system, which can be done from GCP's console or the command line: `gcloud container clusters resize <gcp cluster id> --num-nodes=0`. When going back to the project, run the same command with `num-nodes=3` or whatever number is required.

This application is built following Stephen Grider's new [Microservices course](https://www.udemy.com/course/microservices-with-node-js-and-react). The value offered in Mr. Grider's 30+ hour course is amazing, and it even includes a very thorough 5h primer on TypeScript which would be worth the full course price in itself.
