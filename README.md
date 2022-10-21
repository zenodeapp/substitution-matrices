# Substitution Matrices

A CRUD for Substitution Matrices (like PAM240, BLOSUM62, etc.) commonly used in bioinformatics and evolutionary biology.

This has been built by ZENODE within the Hardhat environment and is licensed under the MIT-license (see [LICENSE.md](./LICENSE.md)).

## Dependencies

- `hardhat` (npm module)
- `web3` (npm module)
- Uses the [`zenode-helpers`](/submodules/zenode-helpers) repository, which is automatically included as a Git submodule.

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

[`4. Configuration`](#4-configuration) <i>--add address to [zenode.config.js](/zenode.config.js)</i>

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

[`6. Interaction`](#6-interaction) <i>--use the scripts provided in the [Interaction](#6-interaction) phase.</i>

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

After having installed all dependencies, use:

```script
npx hardhat node
```

> Make sure to do this in a separate terminal!

<br>
This will create a test environment where we can deploy our contract(s) to. By default, this repository is configured to Hardhat's local test node, but can be changed in the [hardhat.config.js](/hardhat.config.js) file. For more information on how to do this, see [Hardhat's documentation](https://hardhat.org/hardhat-runner/docs/config).

### 3. Deployment

Now that our node is up-and-running, we can deploy our contract using:

```
npx hardhat run scripts/deploy.js
```

> You should see a message appear in your terminal, stating that the contract was deployed successfully.

### 4. Configuration

Before populating our freshly deployed CRUD, we'll first have to make a couple changes to [zenode.config.js](/zenode.config.js) ([learn more](#b-zenodeconfigjs)).

#### 4.1 Link contract address (required)

We add the address of our contract to the `contracts` object. That way it knows which deployed contract it should interact with.

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

> The contract address can be found in your terminal after deployment.

#### 4.2 Editing insertions/deletions (Optional)

By default, all known alphabets and matrices will be inserted upon running the `insert.js` script (in the [`Population`](#5-population) phase). If you would like to change this, edit the following key-value pairs:

```javascript
	{
		// You could also pass in a string instead of an array
		alphabetsToInsert: ["ALPHABET_ID_1", "ALPHABET_ID_2", ...],
		matricesToInsert: ["MATRIX_ID_1", "MATRIX_ID_2", ...],
	}
```

and for the `delete.js` script:

```javascript
	{
		alphabetsToDelete: ["ALPHABET_ID_1", "ALPHABET_ID_2", ...],
		matricesToDelete: ["MATRIX_ID_1", "MATRIX_ID_2", ...],
	}
```

> NOTE: IDs are only valid if they are `keys` in the `alphabets` or `matrices` objects (see [4.3](#43-adding-new-alphabetsmatrices-optional)).

#### 4.3 Adding new alphabets/matrices (Optional)

There are two steps to consider when adding new alphabets or matrices, namely:

1. The creation of the actual file that represents our new dataset, and
2. Creating a reference to this dataset in [zenode.config.js](/zenode.config.js).

For step one it's important to know what data our text parser expects. For this it might be best to look at the files we've already included in the [datasets](/datasets)-folder. I also suggest to read more about the formatting in the Appendix ([A. Alphabets and Matrices](#a-alphabets-and-matrices)).

For the second step we add our new dataset to one of the following objects:

<b>`alphabets`</b>

```javascript
  alphabets: {
    ALPHABET_ID_1: "ALPHABET_ID_1_RELATIVE_PATH",
    ALPHABET_ID_2: "ALPHABET_ID_2_RELATIVE_PATH",
    ...
  },
```

or <b>`matrices`</b>

```javascript
  matrices: {
    MATRIX_ID_1: {
      alphabet: "ALPHABET_ID_2",
      file: "MATRIX_ID_1_RELATIVE_PATH",
    },
    MATRIX_ID_2: {
      alphabet: "ALPHABET_ID_1",
      file: "MATRIX_ID_2_RELATIVE_PATH",
    },
    ...
  },
```

##### 4.3.1 Remarks

- The `alphabets`-object only requires an `ID` and `RELATIVE_PATH`.
- The `matrices`-object on the other hand also requires you to add an `ALPHABET_ID`.
- The `IDs` serve as references in `alphabetsToInsert`, `alphabetsToDelete`, `matricesToInsert` and `matricesToDelete` (see [4.2](#42-editing-insertionsdeletions-optional)).

##### 4.3.2 Examples

`alphabet aa` (amino acids; protein sequence characters):

```javascript
  alphabets: {
    aa: "datasets/alphabets/aa.txt",
  }
```

`matrix blosum100` using `alphabet aa`:

```javascript
  matrices: {
    blosum100: {
      alphabet: "aa",
      file: "datasets/matrices/blosum100.txt",
    },
  },
```

> IMPORTANT: a new alphabet or matrix doesn't get inserted into the contract if it's not included in the `alphabetsToInsert` or `matricesToInsert` key-value pair! (see [4.2](#42-editing-insertionsdeletions-optional))

### 5. Population

Now that we've deployed our contract and configured our setup, we can start populating our CRUD with alphabets and matrices!

#### 5.1 Insertion

To insert all the alphabets/matrices you've configured in the key-value pair `alphabetsToInsert`/`matricesToInsert` use:

```
npx hardhat run scripts/alphabets/insert.js
```

```
npx hardhat run scripts/matrices/insert.js
```

> NOTE: you can't insert a matrix before inserting the alphabet it belongs to!

#### 5.2 Deletion

To delete all the alphabets/matrices you've configured in the key-value pair `alphabetsToDelete`/`matricesToDelete` use:

```
npx hardhat run scripts/alphabets/delete.js
```

```
npx hardhat run scripts/matrices/delete.js
```

### 6. Interaction

Deployed, populated and ready to explore!

Here are a few Hardhat tasks (written in [hardhat.config.js](/hardhat.config.js)) to test our contract with:

<ul>
<li>

<b>getScore</b>

- `input:` `--matrix string` `--a char` `--b char`

- `output:` `int` <i>--value represents the score based on the given substitution matrix</i>

```
npx hardhat getScore --matrix "MATRIX_ID" --a "SINGLE_CHAR_A" --b "SINGLE_CHAR_B"
```

</li>

<li>

<b>getAlphabet</b>

- `input:` `--id string`

- `output:` `struct Alphabet` <i>--see [libraries/Structs.sol](/libraries/Structs.sol)</i>

```
npx hardhat getAlphabet --id "ALPHABET_ID"
```

</li>
<li>

<b>getMatrix</b>

- `input:` `--id string`

- `output:` `struct Matrix` <i>--see [libraries/Structs.sol](/libraries/Structs.sol)</i>

```
npx hardhat getMatrix --id "MATRIX_ID"
```

</li>
<li>

<b>getAlphabets</b>

- `input:` `null`

- `output:` `string[]`

```
npx hardhat getAlphabets
```

</li>
<li>

<b>getMatrices</b>

- `input:` `null`

- `output:` `string[]`

```
npx hardhat getMatrices
```

</li>
</ul>

## Appendix

### A. [Alphabets and Matrices](/datasets)

`Alphabets` and `Matrices` are the two main components of the `SubstitutionMatrices` contract. Alphabets include but are not limited to nucleotide and protein sequence characters (e.g. C, T, A and G), while matrices are 2-dimensional scoring grids (e.g. BLOSUM62, PAM40, PAM120, etc.). To get a better (visual) understanding, you should check out the alphabets and matrices included in the [datasets](/datasets)-folder.

These components are simple .txt-files that abide by the following formatting rules:

- An `alphabet` is a single line of characters, where <b>the position of a character represents its numeric value</b>.
- A `matrix` is a 2-dimensional grid, where the <i>first row</i> and <i>first column</i> consist of <i>only-alphabetical</i> characters.
- The remaining positions of a `matrix` are integers (zero, negative or positive).
- <b>The order of the <i>alphabetical</i> characters inside a `matrix` should be the same as the `alphabet` it belongs to (horizontally and vertically)</b>.
- Every <i>alphanumerical</i> character, for both `alphabet` and `matrix`, is delimited by whitespaces.

### B. [zenode.config.js](/zenode.config.js)

This is where most of the <i>personalization</i> for contract deployment and filling takes place.

In the case of the `SubstitutionMatrices` contract this includes:

- Choosing which alphabets/matrices get inserted or deleted in the [`Population`](#5-population) phase.
- Configuring which contract we'll interact with in the [`Interaction`](#6-interaction) phase.
- Expanding (or shrinking for that matter) the list of known alphabets and matrices.

## Credits

- Hardhat's infrastructure! (https://hardhat.org/)

</br>

<p align="right">— ZEN</p>
<p align="right">Copyright (c) 2022 ZENODE</p>
