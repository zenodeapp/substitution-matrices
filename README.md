# Substitution Matrices

A CRUD for substitution matrices like BLOSUM50, BLOSUM62, PAM250 and more; commonly used in Bioinformatics and Evolutionary Biology.

This has been built by ZENODE within the Hardhat environment and is licensed under the MIT-license (see [LICENSE.md](./LICENSE.md)).

## Overview

### Dependencies

- `hardhat` (npm module)
- `web3` (npm module)
- Uses the [`zenode-contracts`](/submodules) repository, which is automatically included as a Git submodule.

### Features

- CRUD in Solidity; immutable code, but flexible by design.
- Modular; loose coupling and high cohesion promote easy implementation into other contracts.
- Re-usable; deploy only once and use in multiple contracts.
- Ownership; access control and administrative privilege management.

### Dataset

- [AA](dataset/alphabets/aa.txt) (Amino acids; alphabet for Proteins)
  - [BLOSUM50](dataset/matrices/aa/blosum50.txt)
  - [BLOSUM62](dataset/matrices/aa/blosum62.txt)
  - [PAM40](dataset/matrices/aa/pam40.txt)
  - [PAM120](dataset/matrices/aa/pam120.txt)
  - [PAM250](dataset/matrices/aa/pam250.txt)
- [NT](dataset/alphabets/nt.txt) (Nucleotides; alphabet for DNA — also known as the 'Nucleic acid notation')
  - [SIMPLE](dataset/matrices/nt/simple.txt)
  - [SMART](dataset/matrices/nt/smart.txt)

### Hardhat

- Scripts
  - deploy.js - deploys the contract to the configured network.
  - insert.js - reads, parses and inserts matrices or alphabets.
  - delete.js - deletes matrices or alphabets.
- Tasks for contract interaction (see [6. Interaction](#6-interaction)).

### AWK

- Text parsers that convert matrices and alphabets into Solidity code.

## Getting Started

### TL;DR

> [`0. Clone`](#0-clone) <i>--use the --recursive flag.</i>
>
> ```
> git clone --recursive https://github.com/zenodeapp/substitution-matrices.git <destination_folder>
> ```
>
> [`1. Installation`](#1-installation) <i>--use npm, yarn or any other package manager.</i>
>
> ```
> npm install
> ```
>
> ```
> yarn install
> ```
>
> [`2. Run the test node`](#2-configure-and-run-your-test-node) <i>--do this in a separate terminal!</i>
>
> ```script
> npx hardhat node
> ```
>
> [`3. Deployment`](#3-deployment)
>
> ```
> npx hardhat run scripts/deploy.js
> ```
>
> [`4. Configuration`](#4-configuration) <i>--add the contract address to [zenode.config.js](/zenode.config.js)</i>.
>
> ```javascript
> ...
> contracts: {
>   substitutionMatrices: {
>     name: "SubstitutionMatrices",
>     address: "ADD_YOUR_CONTRACT_ADDRESS_HERE",
>   },
> },
> ...
> ```
>
> [`5. Population`](#5-population)
>
> ```
> npx hardhat run scripts/alphabets/insert.js
> ```
>
> ```
> npx hardhat run scripts/matrices/insert.js
> ```
>
> [`6. Interaction`](#6-interaction) <i>--use the scripts provided in the [Interaction](#6-interaction) phase.</i>

### 0. Clone

To get started, clone the repository with the `--recursive` flag:

```
git clone --recursive https://github.com/zenodeapp/substitution-matrices.git <destination_folder>
```

> This repository includes submodules and should thus contain the `--recursive` flag.

<br>

If you've already downloaded, forked or cloned this repository without including the `--recursive` flag, then run this command from the root folder:

```
git submodule update --init --recursive
```

> Read more on how to work with `submodules` in the [zenode-contracts](https://github.com/zenodeapp/zenode-contracts) repository.

### 1. Installation

Install all dependencies using a package manager of your choosing:

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

Our CRUD is deployed, but doesn't contain any data whatsoever. Before we go ahead and populate it with alphabets and matrices, we'll have to make a couple of changes to the [zenode.config.js](zenode.config.js) file.

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

By default, all known alphabets and matrices will be inserted upon running the `insert.js` scripts (in the [Population](#5-population) phase).

If you would like to change this behavior, edit the following key-value pairs:

```javascript
{
  // You could also pass in a string instead of an array
  alphabetsToInsert: ["ALPHABET_ID_1", "ALPHABET_ID_2", ...],
  matricesToInsert: ["MATRIX_ID_1", "MATRIX_ID_2", ...],
}
```

and for the `delete.js` scripts:

```javascript
{
  alphabetsToDelete: ["ALPHABET_ID_1", "ALPHABET_ID_2", ...],
  matricesToDelete: ["MATRIX_ID_1", "MATRIX_ID_2", ...],
}
```

> NOTE: `ID`s are only valid if they are present in the `alphabets` or `matrices` objects (see [4.3](#43-adding-new-alphabetsmatrices-optional)).

#### 4.3 Adding new alphabets/matrices (Optional)

There are two steps to consider when adding new alphabets or matrices, namely:

1. The creation of the actual file that represents our new dataset, and
2. Creating a reference to this dataset in [zenode.config.js](/zenode.config.js).

For step one it's important to know what data our text parser expects. For this it might be best to look at the files we've already included in the [dataset](/dataset) folder. I also suggest to read more about the formatting of `Alphabets and Matrices` in the [Appendix](#a-alphabets-and-matrices).

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
- The `IDs` can be used in `alphabetsToInsert`, `alphabetsToDelete`, `matricesToInsert` and `matricesToDelete` (see [4.2](#42-editing-insertionsdeletions-optional)).

##### 4.3.2 Examples

- `alphabet amino_acids` (protein sequence characters):

  ```javascript
  alphabets: {
    amino_acids: "dataset/alphabets/aa.txt",
  }
  ```

- `matrix blosum100` using `alphabet amino_acids`:
  ```javascript
  matrices: {
    blosum100: {
      alphabet: "amino_acids",
      file: "dataset/matrices/blosum100.txt",
    },
  }
  ```
  <br>

> IMPORTANT: adding a new alphabet or matrix doesn't mean it gets inserted into the contract in the [Population](#5-population) phase. For this it has to be included in the `alphabetsToInsert` or `matricesToInsert` key-value pair! (see [4.2](#42-editing-insertionsdeletions-optional))

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

> NOTE: you cannot insert a matrix before having inserted the alphabet it belongs to!

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

<br>

Here are a few Hardhat tasks (written in [hardhat.config.js](/hardhat.config.js)) to test our contract with:

<ul>
<li>

<b>getScore</b>

Get the alignment score of two characters based on the given substitution matrix.

- `input:` `--matrix string` `--a char` `--b char`

- `output:` `int`

```
npx hardhat getScore --matrix "MATRIX_ID" --a "SINGLE_CHAR_A" --b "SINGLE_CHAR_B"
```

</li>

<li>

<b>getAlphabet</b>

Returns an alphabet-object based on the given ALPHABET_ID.

- `input:` `--id string`

- `output:` `struct Alphabet` <i>--see [libraries/Structs.sol](/libraries/Structs.sol)</i>

```
npx hardhat getAlphabet --id "ALPHABET_ID"
```

</li>
<li>

<b>getMatrix</b>

Returns a matrix-object based on the given MATRIX_ID.

- `input:` `--id string`

- `output:` `struct Matrix` <i>--see [libraries/Structs.sol](/libraries/Structs.sol)</i>

```
npx hardhat getMatrix --id "MATRIX_ID"
```

</li>
<li>

<b>getAlphabets</b>

Returns the list of inserted ALPHABET_IDs.

- `input:` `null`

- `output:` `string[]`

```
npx hardhat getAlphabets
```

</li>
<li>

<b>getMatrices</b>

Returns the list of inserted MATRIX_IDs.

- `input:` `null`

- `output:` `string[]`

```
npx hardhat getMatrices
```

</li>
</ul>

## Appendix

### A. [Alphabets and Matrices](/dataset)

`Alphabets` and `Matrices` are the two main components of the `SubstitutionMatrices` contract. Alphabets include but are not limited to nucleotide and protein sequence characters (e.g. C, T, A and G), while matrices are 2-dimensional scoring grids (e.g. BLOSUM62, PAM40, PAM120, etc.). To get a better (visual) understanding, you should check out the alphabets and matrices included in the [dataset](/dataset) folder.

These components are simple .txt files that abide by the following formatting rules:

- An `alphabet` is a single line of characters, where <b>the position of a character represents its numeric value</b>.
- A `matrix` is a 2-dimensional grid, where the <i>first row</i> and <i>first column</i> consist of <i>only-alphabetical</i> characters.
- The remaining positions of a `matrix` are integers (zero, negative or positive).
- <b>The order of the <i>alphabetical</i> characters inside a `matrix` should be the same as the `alphabet` it belongs to (horizontally and vertically)</b>.
- Every <i>alphanumerical</i> character, for both `alphabet` and `matrix`, is delimited by whitespaces.

### B. [zenode.config.js](/zenode.config.js)

This is where most of the <i>personalization</i> for contract deployment and filling takes place.

In the case of the `substitution-matrices` repository this includes:

- Choosing which alphabets/matrices get inserted or deleted in the [Population](#5-population) phase.
- Configuring which contract we'll interact with in the [Interaction](#6-interaction) phase.
- Expanding (or shrinking for that matter) the list of known alphabets and matrices.

## Credits

- Hardhat's infrastructure! (https://hardhat.org/)

</br>

<p align="right">— ZEN</p>
<p align="right">Copyright (c) 2022 ZENODE</p>
