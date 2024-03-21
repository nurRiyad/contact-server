# Contract Server

### Local Development

1. Run mongodb locally or in docker using `docker run -d -p 27017:27017 mongo`
2. Run `npm i` to install all dependency
3. Run `npm run dev` to start the api server

### Production Build

1. Make sure you have docker installed
2. Run `docker compose up` that's all you need

### Todo

- [x] Add router
- [x] Add model
- [x] Add controller
- [x] Add auth middleware
- [x] Add hashing for password
- [x] Add jwt token
- [x] Add validation
- [x] Handle error properly
- [x] Add proper logger
- [x] Show different error on prod and dev
- [x] Use esm remove common js
- [x] Add docker and docker compose
- [ ] Add test
