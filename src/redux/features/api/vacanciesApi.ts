
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Vacancy, type VacanciesResponse } from '../../../types/vacancies';

const BASE_URL = 'https://api.hh.ru/vacancies';


interface FetchVacanciesParams {
  page?: number;
  per_page?: number;
  industry?: number;
  professional_role?: number;
  text?: string;
  skill_set?: string[];
  city?: string;
}


export const fetchVacancies = createAsyncThunk<Vacancy[], FetchVacanciesParams, { rejectValue: string }>(
  'vacancies/fetchVacancies',
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      queryParams.set('industry', String(params.industry || 7));
      queryParams.set('professional_role', String(params.professional_role || 96));

      const cityToAreaMapping: Record<string, string> = {
        'moscow': '1',  
        'peterburg': '2',  
        'all-cities': '' 
      };
      
      if (params.city && params.city in cityToAreaMapping) {
        const areaId = cityToAreaMapping[params.city];
        if (areaId) {
          queryParams.set('area', areaId);
        }
      }
      
      if (params.page) queryParams.set('page', String(params.page - 1));
      if (params.per_page) queryParams.set('per_page', String(params.per_page));
      
      if (params.text && params.text.trim()) {
        queryParams.set('text', params.text.trim());
      }


      if (params.skill_set && params.skill_set.length > 0) {
        params.skill_set.forEach(skill => {
          queryParams.append('skill_set', skill);
        });
      }

      const response = await fetch(`${BASE_URL}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: VacanciesResponse = await response.json();
      console.log(data)

     const mappedVacancies: Vacancy[] = data.items
        .map(item => ({
          id: item.id,
          name: item.name,
          salary: item.salary,
          experience: item.experience,
          schedule: item.schedule,
          employer: item.employer,
          area: item.area,
          alternate_url: item.alternate_url,
          snippet: item.snippet
        }));
      
      return mappedVacancies;
      
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка'
      );
    }
  }
);