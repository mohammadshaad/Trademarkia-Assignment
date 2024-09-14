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
    aggregation: {
  
      class_codes: {
        buckets: {
          key: string;
          doc_count: number;
        }[];
      };
    };
  }
  
  