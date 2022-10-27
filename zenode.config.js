module.exports = {
  contracts: {
    substitutionMatrices: {
      name: "SubstitutionMatrices",
      address: "",
    },
  },

  alphabets: {
    nucleotides: "dataset/alphabets/nt.txt",
    amino_acids: "dataset/alphabets/aa.txt",
  },

  matrices: {
    simple: {
      alphabet: "nucleotides",
      file: "dataset/matrices/nt/simple.txt",
    },
    smart: {
      alphabet: "nucleotides",
      file: "dataset/matrices/nt/smart.txt",
    },
    blosum50: {
      alphabet: "amino_acids",
      file: "dataset/matrices/aa/blosum50.txt",
    },
    blosum62: {
      alphabet: "amino_acids",
      file: "dataset/matrices/aa/blosum62.txt",
    },
    pam40: {
      alphabet: "amino_acids",
      file: "dataset/matrices/aa/pam40.txt",
    },
    pam120: {
      alphabet: "amino_acids",
      file: "dataset/matrices/aa/pam120.txt",
    },
    pam250: {
      alphabet: "amino_acids",
      file: "dataset/matrices/aa/pam250.txt",
    },
  },

  alphabetsToInsert: ["nucleotides", "amino_acids"], //either give a string value or array
  matricesToInsert: [
    "simple",
    "smart",
    "blosum50",
    "blosum62",
    "pam40",
    "pam120",
    "pam250",
  ],

  alphabetsToDelete: ["nucleotides", "amino_acids"],
  matricesToDelete: [
    "simple",
    "smart",
    "blosum50",
    "blosum62",
    "pam40",
    "pam120",
    "pam250",
  ],
};
