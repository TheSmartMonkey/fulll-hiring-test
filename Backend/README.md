# Requirements

To run this project you will need a computer with Node, Typescript and Cucumber installed.

# Install

To install the project, you just have to run `yarn install` to get all the dependencies

# Running the tests

After installing the dependencies you can run the tests with this command `yarn test`.

## Getting started

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
