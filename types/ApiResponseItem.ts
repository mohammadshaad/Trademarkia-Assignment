export interface ApiResponseItem {
  _source: {
    mark_identification: string;
    current_owner: string;
    current_owner_cleaned: string; // new field
    registration_number: string;
    registration_date: number;
    status_date: number;
    renewal_date: number;
    filing_date: number;
    class_codes: string[];
    mark_description_description: string[];
    law_firm: string; // new field
    law_firm_cleaned: string; // new field
    attorney_name: string; // new field
    attorney_name_cleaned: string; // new field
  };

  aggregation: {
    attorneys: {
      buckets: {
        key: string;
        doc_count: number;
      }[];
    };
    country: {
      buckets: {
        key: string;
        doc_count: number;
      }[];
    };
    current_owners: {
      buckets: {
        key: string;
        doc_count: number;
      }[];
    };
    law_firms: {
      buckets: {
        key: string;
        doc_count: number;
      }[];
    };
    class_codes: {
      buckets: {
        key: string;
        doc_count: number;
      }[];
    };
  };

}
