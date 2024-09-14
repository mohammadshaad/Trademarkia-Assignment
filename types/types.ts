
export interface SearchResult {
  name: string;
  company: string;
  markId: string;
  registration_date: string;
  status_date: string;
  renewal_date: string;
  filing_date: string;
  class: string;
}

export interface ApiResponseItem {
  _source: {
    mark_identification: string;
    current_owner: string;
    registration_number: string;
    registration_date: number;
    status_date: number;
    renewal_date: number;
    filing_date: number;
    class_codes: string[];
  };
}