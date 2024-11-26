# Backend

For this project I've decided to use a simple stack with low dependencies and sqlite for the database because it's easy to setup and it's a file based database so it's easy to run in ci piplines

- For code quality, you can use some tools : which one and why (in a few words) ?

I used eslint to ensure code quality because it's a popular tool for TypeScript and it's easy to setup and add new rules and plugins when the project grows

- you can consider to setup a ci/cd process : describe the necessary actions in a few words

I used Github Actions to setup a CI/CD process because it's easy to setup on a github repo and it's free for public repositories
It's well integrated with github and it allows me to run the tests on every commit and pull request
I've also added github ruleset to force tests to pass before merging

I have done a simple process that could be improved when the project grows, for now I keeped it simple

I have a 3 steps :

- build: build the project and ansure code quality
- unit-test: run unit tests
- integration-test: run integration tests (tests database queries by calling directly sqlite)

## Getting started

Install the dependencies

```shell
yarn install
```

Initialize the database

```shell
yarn run init
```

### Cli commands

```shell
npx ts-node src/main.ts create <userId>
npx ts-node src/main.ts register-vehicle <fleetId> <vehiclePlateNumber>
npx ts-node src/main.ts localize-vehicle <fleetId> <vehiclePlateNumber> lat lng
npx ts-node src/main.ts scan-database
```

### Running tests

```shell
yarn test
```

Run unit tests

```shell
yarn unit
```

Run integration tests (tests database queries by calling directly sqlite)

```shell
yarn integration
```
