"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import type { ProfileIPFS } from "@/lib/schemas";

export type SortOption = "name-asc" | "name-desc" | "updated-desc" | "updated-asc";
export type FilterState = {
  search: string;
  department: string;
  availability: string;
  stackTag: string;
  sort: SortOption;
};

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableDepartments: string[];
  availableStackTags: string[];
}

export function Filters({
  filters,
  onFiltersChange,
  availableDepartments,
  availableStackTags,
}: FiltersProps) {
  const { t } = useI18n();

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      department: "",
      availability: "",
      stackTag: "",
      sort: "updated-desc",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.department ||
    filters.availability ||
    filters.stackTag ||
    filters.sort !== "updated-desc";

  return (
    <div className="space-y-4 mb-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground/60" aria-hidden="true" />
        <Input
          placeholder={t.directory.searchPlaceholder || t.common.search}
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-8 h-7 text-xs"
          aria-label={t.directory.searchAriaLabel}
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={t.directory.clearSearch || "Effacer la recherche"}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Filtre département */}
        <Select value={filters.department} onValueChange={(value) => updateFilter("department", value)}>
          <SelectTrigger className="w-[140px] h-7 text-xs">
            <SelectValue placeholder={t.directory.filterDepartment || "Département"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.directory.allDepartments || "Tous"}</SelectItem>
            {availableDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtre disponibilité */}
        <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
          <SelectTrigger className="w-[140px] h-7 text-xs">
            <SelectValue placeholder={t.directory.filterAvailability || "Disponibilité"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.directory.allAvailability || "Tous"}</SelectItem>
            <SelectItem value="available">{t.profile.available}</SelectItem>
            <SelectItem value="busy">{t.profile.busy}</SelectItem>
            <SelectItem value="unavailable">{t.profile.unavailable}</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtre stack */}
        <Select value={filters.stackTag} onValueChange={(value) => updateFilter("stackTag", value)}>
          <SelectTrigger className="w-[140px] h-7 text-xs">
            <SelectValue placeholder={t.directory.filterStack || "Stack"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.directory.allStack || "Tous"}</SelectItem>
            {availableStackTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Tri */}
        <Select value={filters.sort} onValueChange={(value) => updateFilter("sort", value as SortOption)}>
          <SelectTrigger className="w-[140px] h-7 text-xs">
            <SelectValue placeholder={t.directory.sortBy || "Trier par"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated-desc">{t.directory.sortUpdatedDesc || "Plus récent"}</SelectItem>
            <SelectItem value="updated-asc">{t.directory.sortUpdatedAsc || "Plus ancien"}</SelectItem>
            <SelectItem value="name-asc">{t.directory.sortNameAsc || "Nom A-Z"}</SelectItem>
            <SelectItem value="name-desc">{t.directory.sortNameDesc || "Nom Z-A"}</SelectItem>
          </SelectContent>
        </Select>

        {/* Bouton réinitialiser */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs"
          >
            {t.directory.resetFilters || "Réinitialiser"}
          </Button>
        )}
      </div>
    </div>
  );
}
