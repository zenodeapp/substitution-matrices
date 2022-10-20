const { getContract } = require("../../submodules/zenode-helpers/helpers/web3");
const { contracts, alphabetsToDelete } = require("../../zenode.config");

async function main() {
  const contract = await getContract(
    hre,
    contracts.substitutionMatrices.name,
    contracts.substitutionMatrices.address
  );

  if (Array.isArray(alphabetsToDelete)) {
    for (let i = 0; i < alphabetsToDelete.length; i++) {
      const res = await deleteAlphabet(contract, alphabetsToDelete[i]);
      await res.wait();
    }
  } else {
    deleteAlphabet(contract, alphabetsToDelete);
  }
}

const deleteAlphabet = async (contract, alphabetId) => {
  const deleteAlphabet = await contract.deleteAlphabet(alphabetId);

  console.log(`Successfully deleted the ${alphabetId}-alphabet!`);
  return deleteAlphabet;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
