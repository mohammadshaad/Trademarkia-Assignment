export interface SideFilterProps {
    owners: { name: string; count: number }[];
    lawFirms: { name: string; count: number }[];
    attorneys: { name: string; count: number }[];
    onFilterChange: (selectedFilters: { [key: string]: string[] }, searchQuery: string, selectedOption: string) => void;
  }
  