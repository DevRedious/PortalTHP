import { describe, it, expect } from "vitest";
import { filterAndSortProfiles, extractDepartments, extractStackTags } from "../profile-filters";
import type { ProfileWithAddress } from "../use-profiles";
import type { FilterState } from "@/components/directory/filters";
import type { ProfileIPFS } from "../schemas";

const createMockProfile = (
  address: string,
  firstName: string,
  lastName: string,
  department: string,
  availability: "available" | "busy" | "unavailable",
  stackTags: string[],
  updatedAt: number
): ProfileWithAddress => {
  const profile: ProfileIPFS = {
    version: "1.0",
    firstName,
    lastName,
    department,
    availability,
    stackTags,
    bio: `Bio of ${firstName} ${lastName}`,
    updatedAt: new Date(updatedAt).toISOString(),
  };

  return {
    address,
    profile,
    updatedAt,
    profileURI: `ipfs://${address}`,
  };
};

describe("profile-filters", () => {
  const mockProfiles: ProfileWithAddress[] = [
    createMockProfile("0x1", "Alice", "Doe", "Frontend", "available", ["React", "TypeScript"], 1000),
    createMockProfile("0x2", "Bob", "Smith", "Backend", "busy", ["Node.js", "Python"], 2000),
    createMockProfile("0x3", "Charlie", "Brown", "Frontend", "available", ["Vue", "React"], 3000),
    createMockProfile("0x4", "Diana", "Wilson", "DevOps", "unavailable", ["Docker", "Kubernetes"], 1500),
  ];

  describe("filterAndSortProfiles", () => {
    it("should return all profiles when no filters are applied", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "",
        stackTag: "",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result).toHaveLength(4);
    });

    it("should filter by search query", () => {
      const filters: FilterState = {
        search: "Alice",
        department: "",
        availability: "",
        stackTag: "",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result).toHaveLength(1);
      expect(result[0].profile?.firstName).toBe("Alice");
    });

    it("should filter by department", () => {
      const filters: FilterState = {
        search: "",
        department: "Frontend",
        availability: "",
        stackTag: "",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.profile?.department === "Frontend")).toBe(true);
    });

    it("should filter by availability", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "available",
        stackTag: "",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.profile?.availability === "available")).toBe(true);
    });

    it("should filter by stack tag", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "",
        stackTag: "React",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.profile?.stackTags.includes("React"))).toBe(true);
    });

    it("should combine multiple filters", () => {
      const filters: FilterState = {
        search: "",
        department: "Frontend",
        availability: "available",
        stackTag: "React",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.profile?.department === "Frontend")).toBe(true);
      expect(result.every((p) => p.profile?.availability === "available")).toBe(true);
      expect(result.every((p) => p.profile?.stackTags.includes("React"))).toBe(true);
    });

    it("should sort by name ascending", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "",
        stackTag: "",
        sort: "name-asc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result[0].profile?.firstName).toBe("Alice");
      expect(result[result.length - 1].profile?.firstName).toBe("Diana");
    });

    it("should sort by name descending", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "",
        stackTag: "",
        sort: "name-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result[0].profile?.firstName).toBe("Diana");
      expect(result[result.length - 1].profile?.firstName).toBe("Alice");
    });

    it("should sort by updated date ascending", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "",
        stackTag: "",
        sort: "updated-asc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result[0].updatedAt).toBe(1000);
      expect(result[result.length - 1].updatedAt).toBe(3000);
    });

    it("should sort by updated date descending (default)", () => {
      const filters: FilterState = {
        search: "",
        department: "",
        availability: "",
        stackTag: "",
        sort: "updated-desc",
      };
      const result = filterAndSortProfiles(mockProfiles, filters);
      expect(result[0].updatedAt).toBe(3000);
      expect(result[result.length - 1].updatedAt).toBe(1000);
    });
  });

  describe("extractDepartments", () => {
    it("should extract unique departments", () => {
      const departments = extractDepartments(mockProfiles);
      expect(departments).toHaveLength(3);
      expect(departments).toContain("Frontend");
      expect(departments).toContain("Backend");
      expect(departments).toContain("DevOps");
    });

    it("should return sorted departments", () => {
      const departments = extractDepartments(mockProfiles);
      expect(departments[0]).toBe("Backend");
      expect(departments[1]).toBe("DevOps");
      expect(departments[2]).toBe("Frontend");
    });

    it("should return empty array for empty profiles", () => {
      const departments = extractDepartments([]);
      expect(departments).toHaveLength(0);
    });
  });

  describe("extractStackTags", () => {
    it("should extract unique stack tags", () => {
      const tags = extractStackTags(mockProfiles);
      expect(tags.length).toBeGreaterThan(0);
      expect(tags).toContain("React");
      expect(tags).toContain("TypeScript");
      expect(tags).toContain("Node.js");
    });

    it("should return sorted tags", () => {
      const tags = extractStackTags(mockProfiles);
      const sorted = [...tags].sort();
      expect(tags).toEqual(sorted);
    });

    it("should return empty array for empty profiles", () => {
      const tags = extractStackTags([]);
      expect(tags).toHaveLength(0);
    });
  });
});
