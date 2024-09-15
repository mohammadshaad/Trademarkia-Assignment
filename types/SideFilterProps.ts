export interface SideFilterProps {
  owners: { name: string; name_cleaned: string; count: number }[];
  lawFirms: { name: string; name_cleaned: string; count: number }[];
  attorneys: { name: string; name_cleaned: string; count: number }[];
  onFilterChange: (filters: { [key: string]: string[] }) => void;
  onViewChange: (view: 'grid' | 'list') => void;
}
