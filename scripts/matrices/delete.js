const { getContract } = require("../../submodules/zenode-helpers/helpers/web3");
const { contracts, matricesToDelete } = require("../../zenode.config");

async function main() {
  const contract = await getContract(
    hre,
    contracts.substitutionMatrices.name,
    contracts.substitutionMatrices.address
  );

  if (Array.isArray(matricesToDelete)) {
    for (let i = 0; i < matricesToDelete.length; i++) {
      const res = await deleteMatrix(contract, matricesToDelete[i]);
      await res.wait();
    }
  } else {
    deleteMatrix(contract, matricesToDelete);
  }
}

const deleteMatrix = async (contract, matrixId) => {
  const deleteMatrix = await contract.deleteMatrix(matrixId);

  console.log(`Successfully deleted the ${matrixId}-matrix!`);
  return deleteMatrix;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
