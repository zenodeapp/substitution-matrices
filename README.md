# Substitution Matrices
A CRUD for Substitution Matrices (like PAM240, BLOSUM62, etc.) commonly used in bioinformatics and evolutionary biology.

This has been built by ZENODE within the Hardhat environment and is licensed under the MIT-license (see [LICENSE.md](./LICENSE.md)).

## Dependencies
- `hardhat` (npm module)
- `web3` (npm module)
- Uses the `zenode-helpers` repository, which is automatically included as a Git submodule.

## Getting Started
### 1. Installation
To get started, install all dependencies using a package manager of your choosing. For instance:
```
npm install
```
```
yarn install
```

### 2. Configure and run your (test) node
After having installed all dependencies use:
```script
npx hardhat node
```
`NOTE: Make sure to do this in a separate terminal!`
<br>
<br>
This will create a local test environment where we shall deploy our contract to. On default the network is configured to Hardhat's local node, which you can change in [hardhat.config.js](/hardhat.config.js) (for more info on this, see: https://hardhat.org/hardhat-runner/docs/config).

### 3. Deploy 
Now after having a node up and running we'll have to deploy our contract:
```
npx hardhat run scripts/deploy.js
```

Before we populate our freshly deployed CRUD, we'll have to make a couple changes to our [zenode.config.js](/zenode.config.js)-file.

### 4. zenode.config.js
This is where most of the personalization/customization for contract deployment/filling takes place. For `substitution-matrices` this config file particularly deals with storing the pathnames for the alphabets and matrices and which of those should be inserted into or deleted from the deployed CRUD. Read more about alphabets and matrices in sub-section 4.2.

#### 4.1 Configuration
##### 4.1.1 Add contract address
First things first: after deploying, add the contract address to:
```javascript
  ...
  contracts: {
    substitutionMatrices: {
      name: "SubstitutionMatrices",
      address: "YOUR_CONTRACT_ADDRESS",
    },
  },
  ...
```
`NOTE: The contract address can be found in your terminal after deployment.`
<br>
<br>

##### 4.1.2 Editing insertions/deletions (Optional)
...
##### 4.1.3 Adding new alphabets/matrices (Optional)
...

### 5 Alphabets and Matrices
Alphabets and Matrices are the two main components in the substitution-matrices contract. Alphabets being nucleotide or protein sequence characters (e.g. C, T, A and G) and Matrices being 2-dimensional substitution matrices (e.g. BLOSUM62, PAM40, PAM120, etc.). All the alphabets and matrices included in this repository are in the [datasets](/datasets)-folder, which are simple .txt-files in the following format:

1. Alphabet: is a single line of characters, delimited by whitespaces. Do note that the order of the characters is important!
2. Matrix: is a 2-dimensional grid, where the row- and column names are characters from the matching alphabet. Again, the order of the characters is important and should be the same as the corresponding alphabet's .txt-file!
<br>
TIP: If you want to create a new matrix or alphabet, use any of the included files as a guideline or template.

### 6. Scripts
...

## Credits

- Hardhat's infrastructure! (https://hardhat.org/)

  </br>

— ZEN - https://twitter.com/KeymasterZen
