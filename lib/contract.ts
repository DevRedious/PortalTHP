export const THP_PROFILE_REGISTRY_ABI = [
  {
    inputs: [
      { name: "profileURI", type: "string" },
      { name: "isPublic", type: "bool" },
    ],
    name: "setProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "getProfile",
    outputs: [
      {
        components: [
          { name: "owner", type: "address" },
          { name: "profileURI", type: "string" },
          { name: "isPublic", type: "bool" },
          { name: "updatedAt", type: "uint256" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProfiles",
    outputs: [
      {
        components: [
          { name: "owner", type: "address" },
          { name: "profileURI", type: "string" },
          { name: "isPublic", type: "bool" },
          { name: "updatedAt", type: "uint256" },
        ],
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProfileCount",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getContractAddress(): `0x${string}` {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!address) {
    // Retourner une adresse par défaut pour le build (sera remplacée en production)
    return "0x0000000000000000000000000000000000000000" as `0x${string}`;
  }
  return address as `0x${string}`;
}
