# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Installation
```
yarn 
yarn hardhat test
```

NOTE: You can just do `yarn add` but it might not resolve and give you the best package versions, it is better to change `package.json` to get the package version you want and then do `yarn`, for example add this into `package.json`:
```
    "@nomiclabs/hardhat-ethers": "^2.0.3",

```


```
yarn add @openzeppelin/contracts
yarn add dotenv

yarn add @nomiclabs/hardhat-ethers
```

To test
```
yarn hardhat compile
yarn hardhat test
yarn hardhat test test/MAxNFT.test.ts
```

To deploy:
click on `view key` in https://dashboard.alchemyapi.io/apps/3u01lpm5eekblaio to get your rinkeby URL
paste it into ROPSTEN_URL in .env

go to etherscan and copy paste your API key into .env.example file again
ETHERSCAN_API_KEY

go to MM and change to testnet (the consistent one) and then get some test coins and export your private key to fill it out in .env.example
PRIVATE_KEY

In your `.env` you should have:
```
ETHERSCAN_API_KEY=
RINKEBY_URL=
PRIVATE_KEY=
REPORT_GAS=false
```

Go to `hardhat.config.ts`
-change all the ROPSTEN to RINKEBY like
```
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
```


To publish and deploy
```
yarn hardhat run scripts/deploy.ts --network rinkeby
```

You should get
```
➜  hardhat-ts-template git:(nft-things) ✗ yarn hardhat run scripts/deploy.ts --network rinkeby
yarn run v1.22.17
$ /Users/henryleemr/Documents/workplace/personal/techtics/hardhat-ts-template/node_modules/.bin/hardhat run scripts/deploy.ts --network rinkeby
No need to generate any newer typings.
Greeter deployed to: 0x644AB8Af24e5BBCfBD9d858a968fdcb7EF371A77
✨  Done in 43.28s.
```

Check it out at the RINKEBY etherscan:
```
https://rinkeby.etherscan.io/address/0x644AB8Af24e5BBCfBD9d858a968fdcb7EF371A77
```

To verify on etherscan: (there are no initialisation parameters needed to be passed into the constructor so no need for flags)
```
 yarn hardhat verify --network rinkeby 0x644AB8Af24e5BBCfBD9d858a968fdcb7EF371A77
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
