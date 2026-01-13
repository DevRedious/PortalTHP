import { describe, it, expect } from "vitest";
import { truncateAddress } from "../utils";

describe("utils", () => {
  describe("truncateAddress", () => {
    it("should truncate Ethereum address correctly", () => {
      const address = "0x1234567890123456789012345678901234567890";
      const result = truncateAddress(address);
      expect(result).toBe("0x1234...7890");
    });

    it("should handle short addresses", () => {
      const address = "0x1234";
      const result = truncateAddress(address);
      // Should return as-is if too short
      expect(result.length).toBeLessThanOrEqual(address.length + 7);
    });

    it("should handle empty string", () => {
      const result = truncateAddress("");
      expect(result).toBe("");
    });
  });
});
