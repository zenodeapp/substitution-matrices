module.exports = {
  contracts: {
    substitutionMatrices: {
      name: "SubstitutionMatrices",
      address: "",
    },
  },

  alphabets: {
    nt: "datasets/alphabets/nt.txt",
    aa: "datasets/alphabets/aa.txt",
  },

  matrices: {
    simple: {
      alphabet: "nt",
      file: "datasets/matrices/nt/simple.txt",
    },
    smart: {
      alphabet: "nt",
      file: "datasets/matrices/nt/smart.txt",
    },
    blosum50: {
      alphabet: "aa",
      file: "datasets/matrices/aa/blosum50.txt",
    },
    blosum62: {
      alphabet: "aa",
      file: "datasets/matrices/aa/blosum62.txt",
    },
    pam40: {
      alphabet: "aa",
      file: "datasets/matrices/aa/pam40.txt",
    },
    pam120: {
      alphabet: "aa",
      file: "datasets/matrices/aa/pam120.txt",
    },
    pam250: {
      alphabet: "aa",
      file: "datasets/matrices/aa/pam250.txt",
    },
  },

  alphabetsToInsert: ["aa", "nt"], //either give a string value or array
  matricesToInsert: [
    "simple",
    "smart",
    "blosum50",
    "blosum62",
    "pam40",
    "pam120",
    "pam250",
  ],

  alphabetsToDelete: ["aa", "nt"],
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
