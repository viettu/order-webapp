# Full stack Engineer practical

## Introduction
The code is structured into four projects that can deploy separately
1. [Web application](#1-web-application) for making or reviewing Orders
2. [Orders microservice](#2-microservice-orders--ms-orders-) provides APIs for creating, updating and retriving orders
3. [Payments microservice](#3-microservice-payments--ms-payments-) recieves orders from order microservice and return an payment decision
4. [BFF (Graphql)](#4-bff-orders--bff-orders-) for retrieving data from microservice orders


## Technical stack
- Typescript
- ReactJs with charkra UI framework
- GraphQL for BFF, consume by Apollo client
- NestJs for microservices
- NestJs Queue for scheduling auto-delivery process
- RabbitMQ queue for sending messages between microservices
- AWS RDS MySQL
- Jest for unit testing

### 1. Web application
Client portal for interacting with service api<br/>
This allows to create orders, cancel an order, list orders and view order detail

#### 1.1 Design
- 1. Home screen
![image](https://user-images.githubusercontent.com/6614651/170858940-987c2dba-7700-4811-9de5-feb0c2d88f04.png)

- 2. Shopping cart
<img width="1502" alt="image" src="https://user-images.githubusercontent.com/6614651/170858972-21760135-7628-4aef-bd24-405e5e2ea4b0.png">

- 3. Order is created and waiting for delivery
<img width="1502" alt="image" src="https://user-images.githubusercontent.com/6614651/170859027-e2cc91f5-d482-4b33-b118-7193c85dbd92.png">

- 4. Order Detail
<img width="1502" alt="image" src="https://user-images.githubusercontent.com/6614651/170859053-0adfe278-b8a4-4ad8-8ef9-6f45e3dbf172.png">

- 5. List of orders
<img width="1502" alt="image" src="https://user-images.githubusercontent.com/6614651/170859089-e541e8a2-932e-4156-bb09-53d151f348e3.png">

#### 1.2 Installation

Install the dependencies and devDependencies and start the server.
```sh
cd webapp/frontend
npm i
npm run start
```

#### 1.3 Thing should be improved next time
- Adding unit testings
- UI consistency
<br/>

### 2. Microservice orders ( ms-orders )
Provides APIs for update creating, updating retrieving orders

![image](https://user-images.githubusercontent.com/6614651/170871051-5f1915e6-cd89-453d-b3ae-9a41b2f4406b.png)


#### 2.1 Design
1. Use RabbitMQ QUEUE to keep meesages from ms-orders and then consumed by ms-payments. This helps decouple services
2. Use NestJs QUEUE to schedule updating the state to DELIVERY after 10 seconds

![image](https://user-images.githubusercontent.com/6614651/170858414-b6206c20-536d-4583-bfd9-13427fb06e0a.png)


#### 2.2 Installation

Install the dependencies and devDependencies and start the server.
```sh
cd ms-orders
npm i
```
Start Redis for working with NestJs queue. Inside folder ms-orders, execute this command:
```sh
docker-compose -f "docker-compose-redis.yml" up
```
Then we can start the service
```sh
npm run start:dev
```
After this command, the service will listen on PORT 8001 and the swagger is available at http://localhost:8001/orders-api/

#### 2.3 Deployment
We can simulate deploying the service to K8s minikube. This requires minikube, kubectl and kustomize pre-installed.<br/>
All YML files are setting never pull images for local testing.<br/>
We must manually adding build images to minikube manually<br/>

Inside folder ms-orders, execute this command to deploy to minikube
```sh
kustomize build K8s/overlays/prod | kubectl apply -f -
```
Install docker image to minikube manually
```sh
eval $(minikube docker-env)
docker build . -t ms-orders:v1
```

#### 2.4 Thing should be improved next time
- Should implement error management
- The validations could be done better
- ...
<br/>

### 3. Microservice payments ( ms-payments )
Consume the RabbitMQ queue and send the decision CONFIRMED or DECLINED to ms-orders

#### 3.1 Installation

Install the dependencies and devDependencies and start the server.
```sh
cd ms-payments
npm i
npm run start:dev
```

#### 3.2 Deployment
We can simulate deploying the service to K8s minikube. This requires minikube, kubectl and kustomize pre-installed.<br/>
All YML files are setting never pull images for local testing.<br/>
We must manually adding build images to minikube manually<br/>

Inside folder ms-payments, execute this command to deploy to minikube
```sh
kustomize build K8s/overlays/prod | kubectl apply -f -
```
Install docker image to minikube manually
```sh
eval $(minikube docker-env)
docker build . -t ms-payments:v1
```
<br/>

### 4. BFF orders ( bff-orders )
This service get data from ms-orders than provide the graphQl to be called from UI

#### 4.1 Design
This implements the GraphQL in typescript

#### 4.2 Installation
Install the dependencies and devDependencies and build the code.
```sh
cd webapp/bff-orders
npm i
npm run build
```

Then we can start the service
```sh
npm run start
```
After this command, the service will listen on PORT 3200

#### 4.3 Deployment
We can simulate deploying the service to K8s minikube. This requires minikube, kubectl and kustomize pre-installed.<br/>
All YML files are setting never pull images for local testing.<br/>
We must manually adding build images to minikube manually<br/>

Inside folder webapp/bff-orders, execute this command to deploy to minikube
```sh
kustomize build K8s/overlays/prod | kubectl apply -f -
```

Install docker image to minikube manually
```sh
eval $(minikube docker-env)
docker build . -t bff-orders:v1
```
