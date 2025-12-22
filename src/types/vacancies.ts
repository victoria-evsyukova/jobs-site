export interface Vacancy {
  id: string;
  name: string;
  salary: {
    from?: number;
    to?: number;
    currency: string;
    gross: boolean;
  } | null;
  experience: {
    id: string;
    name: string;
  };
  schedule: {
    id: string;
    name: string;
  };
  employer: {
    id: string;
    name: string;
  };
  area: {
    id: string;
    name: string;
  };
  alternate_url: string;
  snippet: {
    requirement: string,
    responsibility: string
  }
}


export interface VacanciesResponse {
  items: Vacancy[];
  pages: number;
  page: number;
  per_page: number;
}

export interface SearchParams {
  text: string;
  area: string;
  skills: string[];
}

export interface VacanciesState {
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
}