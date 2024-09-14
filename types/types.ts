
export interface SearchResult {
  name: string;
  company: string;
  markId: string;
  date: string;
  class: string;
}

export interface ApiResponseItem {
  _source: {
    mark_identification: string;
    current_owner: string;
    registration_number: string;
    registration_date: number;
    class_codes: string[];
  };
}