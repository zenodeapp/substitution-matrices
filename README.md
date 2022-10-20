# Substitution Matrices

A CRUD for Substitution Matrices (like PAM240, BLOSUM62, etc.) commonly used in bioinformatics and evolutionary biology.

This has been built by ZENODE within the Hardhat environment and is licensed under the MIT-license (see [LICENSE.md](./LICENSE.md)).

## TL;DR

[`1. Installation`](#1-installation) <i>--use npm, yarn or any other package manager.</i>

```
npm install
```

```
yarn install
```

[`2. Run the test node`](#2-configure-and-run-your-test-node) <i>--do this in a separate terminal!</i>

```script
npx hardhat node
```

[`3. Deployment`](#3-deployment)

```
npx hardhat run scripts/deploy.js
```

[`4. Configuration`](#4-configuration) <i>--add address to [zenode.config.js](\zenode.config.js)</i>

```javascript
	...
	contracts: {
		substitutionMatrices: {
			name: "SubstitutionMatrices",
			address: "ADD_YOUR_CONTRACT_ADDRESS_HERE",
		},
	},
	...
```

[`5. Population`](#5-population)

```
npx hardhat run scripts/alphabets/insert.js
npx hardhat run scripts/matrices/insert.js
```

[`6. Interaction`](#6-interaction) <i>--use the scripts provided in the [Interaction phase](#6-interaction).</i>

## Dependencies

- `hardhat` (npm module)
- `web3` (npm module)
- Uses the [`zenode-helpers`](/submodules/zenode-helpers) repository, which is automatically included as a Git submodule.

## Getting Started

### 1. Installation

To get started, install all dependencies using a package manager of your choosing:

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
This will create a test environment where we can deploy our contract(s) to. By default, this repository is configured to Hardhat's local test node, but can be changed in the [hardhat.config.js](/hardhat.config.js) file. For more information on how to do this, see [Hardhat's documentation](https://hardhat.org/hardhat-runner/docs/config).

### 3. Deployment

Now that our node is up-and-running, we can deploy our contract using:

```
npx hardhat run scripts/deploy.js
```

If all went well, you should see a message appear in your terminal, stating that the contract was deployed successfully.

### 4. Configuration

Before populating our freshly deployed CRUD, we'll first have to make a couple changes to our [zenode.config.js](/zenode.config.js) file ([learn more](#b-zenodeconfigjs)).

#### 4.1 Link contract address (required)

To know where we have to insert our alphabets and matrices, we'll have to add the address of our deployed contract to the `contracts` object.

```javascript
	...
	contracts: {
		substitutionMatrices: {
			name: "SubstitutionMatrices",
			address: "ADD_YOUR_CONTRACT_ADDRESS_HERE",
		},
	},
	...
```

`NOTE: The contract address can be found in your terminal after deployment.`
<br>

#### 4.2 Editing insertions/deletions (Optional)

By default, all (known) alphabets and matrices will be inserted upon running the `insert.js` script (`Population` phase). If you would like to change this, you could. Just edit the following key-value pairs:

```javascript
	{
		// You could also pass in a string instead of an array
		alphabetsToInsert: ["ALPHABET_ID_1", "ALPHABET_ID_2", ...],
		matricesToInsert: ["MATRIX_ID_1", "MATRIX_ID_2", ...],
	}
```

For the `delete.js` script:

```javascript
	{
		alphabetsToDelete: ["ALPHABET_ID_1", "ALPHABET_ID_2", ...],
		matricesToDelete: ["MATRIX_ID_1", "MATRIX_ID_2", ...],
	}
```

`NOTE: The IDs are only valid if they are 'keys' found in the 'alphabets' and 'matrices' objects (more about this in the next sub-section).`

#### 4.3 Creating new alphabets/matrices (Optional)

...

### 5. Population

Now that we've deployed our contract and configured our setup, we can start populating our CRUD with alphabets and matrices!

#### 5.1 Alphabets

To insert all the alphabets you've configured in the key-value pair `alphabetsToInsert` use:

```
npx hardhat run scripts/alphabets/insert.js
```

#### 5.2 Matrices

To insert all the matrices you've configured in the key-value pair `matricesToInsert` use:

```
npx hardhat run scripts/matrices/insert.js
```

`NOTE: you can't insert a matrix before inserting the alphabet it belongs to!`

### 6. Interaction

Deployed, populated and ready to explore! Here are a few Hardhat tasks (written in [hardhat.config.js](\hardhat.config.js)) to test our contract with:

<ul>
<li>

`getScore`
output: int <i>--value represents the score of two characters in the substitution matrix</i>

```
npx hardhat getScore --matrix "MATRIX_ID" --a "SINGLE_CHAR_A" --b "SINGLE_CHAR_B"
```

</li>

<li>

`getAlphabet`
output: struct Alphabet <i>--see [libraries/Structs.sol](/libraries/Structs.sol)</i>

```
npx hardhat getAlphabet --id "ALPHABET_ID"
```

</li>
<li>

`getMatrix`
output: struct Matrix <i>--see [libraries/Structs.sol](/libraries/Structs.sol)</i>

```
npx hardhat getMatrix --id "MATRIX_ID"
```

</li>
<li>

`getAlphabets`
output: string[]

```
npx hardhat getAlphabets
```

</li>
<li>

`getMatrices`
output: string[]

```
npx hardhat getMatrices
```

</li>
</ul>

## Appendix

### A. Alphabets and Matrices

Alphabets and Matrices are the two main components in the `SubstitutionMatrices` contract. `Alphabets` (currently) being: `nucleotide or protein sequence characters` (e.g. C, T, A and G) and `Matrices`: `2-dimensional grids` (e.g. BLOSUM62, PAM40, PAM120, etc.). To gain a better visual understanding, check out the alphabets and matrices included in the [datasets](/datasets)-folder.

They are simple .txt-files abiding by the following formatting rules:

- An `alphabet` is a single line of characters, delimited by whitespaces. Mind you that <b>the order of the characters is important</b> as their position represents their numeric value in the contract.

- A `matrix` is a 2-dimensional grid, where the first row and first column are alphabetical characters. The remaining positions in the grid are integers (zero, negative or positive). <b>Again, the order of the alphabetical characters is important and should be the same as the corresponding alphabet!</b>

### B. [zenode.config.js](/zenode.config.js)

This is where most of the <i>personalization</i> for contract deployment and filling takes place. In the case of the `SubstitutionMatrices` contract this includes:

- Choosing which alphabets/matrices get inserted or deleted in the `Population` phase.
- Configuring which contract we'll interact with in the `Interaction` phase.
- Expanding (or shrinking for that matter) the list of known alphabets and matrices.

## Credits

- Hardhat's infrastructure! (https://hardhat.org/)

</br>

<p align="right">— ZEN</p>
<p align="right">Copyright (c) 2022 ZENODE</p>
