import { createConfig, http } from "wagmi";
import { sepolia, holesky, baseSepolia } from "wagmi/chains";
import { injected, walletConnect } from "@wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const chains = [sepolia, holesky, baseSepolia] as const;

export const config = createConfig({
  chains,
  connectors: [
    injected({ target: "metaMask" }),
    walletConnect({ projectId }),
  ],
  transports: {
    [sepolia.id]: http(),
    [holesky.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export type Chain = (typeof chains)[number];
