export interface SideFilterProps {
    owners: { name: string; name_cleaned: string; count: number }[];
    lawFirms: { name: string; name_cleaned: string; count: number }[];
    attorneys: { name: string; name_cleaned: string; count: number }[];
    onFilterChange: (selectedFilters: { [key: string]: string[] }, searchQuery: string, selectedOption: string) => void;
  }
  