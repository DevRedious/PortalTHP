import type { ProfileWithAddress } from "./use-profiles";
import type { FilterState } from "@/components/directory/filters";

/**
 * Filtre et trie les profils selon les critères fournis
 */
export function filterAndSortProfiles(
  profiles: ProfileWithAddress[],
  filters: FilterState
): ProfileWithAddress[] {
  let filtered = profiles.filter((p) => {
    if (!p.profile) return false;

    // Recherche textuelle
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesSearch =
        p.profile.firstName.toLowerCase().includes(query) ||
        p.profile.lastName.toLowerCase().includes(query) ||
        p.profile.department.toLowerCase().includes(query) ||
        p.profile.stackTags.some((tag) => tag.toLowerCase().includes(query)) ||
        p.profile.bio.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Filtre département
    if (filters.department && p.profile.department !== filters.department) {
      return false;
    }

    // Filtre disponibilité
    if (filters.availability && p.profile.availability !== filters.availability) {
      return false;
    }

    // Filtre stack tag
    if (filters.stackTag && !p.profile.stackTags.includes(filters.stackTag)) {
      return false;
    }

    return true;
  });

  // Tri
  filtered.sort((a, b) => {
    if (!a.profile || !b.profile) return 0;

    switch (filters.sort) {
      case "name-asc":
        const nameA = `${a.profile.firstName} ${a.profile.lastName}`.toLowerCase();
        const nameB = `${b.profile.firstName} ${b.profile.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);

      case "name-desc":
        const nameA2 = `${a.profile.firstName} ${a.profile.lastName}`.toLowerCase();
        const nameB2 = `${b.profile.firstName} ${b.profile.lastName}`.toLowerCase();
        return nameB2.localeCompare(nameA2);

      case "updated-asc":
        return a.updatedAt - b.updatedAt;

      case "updated-desc":
      default:
        return b.updatedAt - a.updatedAt;
    }
  });

  return filtered;
}

/**
 * Extrait les départements uniques depuis une liste de profils
 */
export function extractDepartments(profiles: ProfileWithAddress[]): string[] {
  const departments = new Set<string>();
  profiles.forEach((p) => {
    if (p.profile?.department) {
      departments.add(p.profile.department);
    }
  });
  return Array.from(departments).sort();
}

/**
 * Extrait les tags de stack uniques depuis une liste de profils
 */
export function extractStackTags(profiles: ProfileWithAddress[]): string[] {
  const tags = new Set<string>();
  profiles.forEach((p) => {
    if (p.profile?.stackTags) {
      p.profile.stackTags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}
