import { SiweMessage } from "siwe";
import type { Address } from "viem";

export function createSiweMessage(
  address: Address,
  statement: string,
  domain: string,
  origin: string
): SiweMessage {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "11155111"),
    nonce: generateNonce(),
  });
  return message;
}

export function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export async function verifySiweMessage(message: string, signature: string): Promise<boolean> {
  try {
    const siweMessage = new SiweMessage(message);
    // Note: En production, vous devriez vérifier la signature côté serveur
    // Pour cette version web3-only, on fait une vérification basique
    const result = await siweMessage.verify({ signature });
    return result.success;
  } catch {
    return false;
  }
}
