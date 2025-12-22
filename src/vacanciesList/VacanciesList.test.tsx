import { render } from '../test/utils';
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'; 
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import VacanciesList from './VacanciesList';
import vacanciesReducer from '../redux/features/slices/VacanciesSlice';
import type { VacanciesState } from '../types/vacancies';
import { useSearchParams } from 'react-router-dom';

// 1. Сначала мокируем useSearchParams
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: vi.fn(),
}));


vi.mock('../features/vacancy/Vacancy', () => ({
  default: ({ vacancy }: { vacancy: any }) => (
    <div data-testid={`vacancy-${vacancy.id}`}>
      {vacancy.name} - {vacancy.employer.name}
    </div>
  ),
}));



const mockFetchVacancies = vi.fn().mockResolvedValue([
  { id: '1', name: 'Test', employer: { name: 'Company' } }
]);

vi.mock('../../redux/features/api/vacanciesApi', () => ({
  fetchVacancies: mockFetchVacancies,
}));

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    Loader: () => <div data-testid="loader">Loading...</div>,
  };
});


const mockInitialState: VacanciesState = {
  vacancies: [],
  loading: false,
  error: null,
};


const createTestStore = (preloadedState: { vacancy: VacanciesState }) => {
  return configureStore({
    reducer: {
      vacancy: vacanciesReducer,
    },
    preloadedState,
  });
};


const renderWithProviders = (
    ui: React.ReactElement, 
    preloadedState?: Partial<VacanciesState>
  ) => {
    const fullState: VacanciesState = {
      ...mockInitialState,
      ...preloadedState, 
    };

    const store = createTestStore({
      vacancy: fullState, 
    });

    return {
      store,
      ...render(<Provider store={store}>{ui}</Provider>),
    };
};


  describe('Состояния компонента', () => {
    it('отображает индикатор загрузки при loading = true', () => {
      const preloadedState: VacanciesState = {
        ...mockInitialState,
        loading: true,
      };

      renderWithProviders(<VacanciesList />, preloadedState);
      
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });


    it('отображает сообщение об ошибке при наличии error', () => {
      const errorMessage = 'Ошибка сети';

      const store = configureStore({
        reducer: {
          vacancy: (state = {
            ...mockInitialState,
            loading: false, 
            error: errorMessage,
          }) => state
        }
      });

      render(
        <Provider store={store}>
          <VacanciesList />
        </Provider>
      );

      const errorElement = screen.getByText(`Error: ${errorMessage}`);
      expect(errorElement).toBeInTheDocument();
    });

  });

  describe('Работа со списком вакансий', async () => {
    const mockVacancies = [
      {
        id: '1',
        name: 'Frontend Developer',
        salary: { from: 100000, to: 200000, currency: 'RUR', gross: true },
        experience: { id: '2', name: '1-3 года' },
        schedule: { id: '3', name: 'Полный день' },
        employer: { id: '4', name: 'Google' },
        area: { id: '1', name: 'Москва' },
        alternate_url: 'https://example.com/vacancy/1',
        snippet: { 
          requirement: 'Требования: TypeScript, React',
          responsibility: 'Обязанности: Разработка интерфейсов'
        },
      },
    ];

    it('отображает список вакансий при их наличии', () => {
    const store = configureStore({
      reducer: {
        vacancy: (state = {
          vacancies: mockVacancies,
          loading: false,
          error: null,
        }) => state
      }
    });

    render(
      <Provider store={store}>
        <VacanciesList />
      </Provider>
    );
      screen.debug()

 
      const vacancyElement = screen.getByTestId('vacancy-1');
      expect(vacancyElement).toBeInTheDocument();
      const vacancyText = screen.getByText('Frontend Developer - Google');
      expect(vacancyText).toBeInTheDocument();
    });


    it('отображает текст поиска при наличии searchParams.text', async () => {
      const searchText = 'Frontend';

      (useSearchParams as any).mockReturnValue([
        new URLSearchParams({ text: searchText }),
      ]);

      const store = configureStore({
        reducer: {
          vacancy: (state = {
            vacancies: mockVacancies,
            loading: false,
            error: null,
          }) => state
        }
    });

    render(
      <Provider store={store}>
        <VacanciesList />
      </Provider>
    );
      screen.debug()

      expect(screen.getByText(`Поиск: "${searchText}"`)).toBeInTheDocument();
    });



    it('не отображает текст поиска при отсутствии searchParams.text', () => {
      (useSearchParams as any).mockReturnValue([
        new URLSearchParams(),
      ]);

      const preloadedState: VacanciesState = {
        ...mockInitialState,
        vacancies: mockVacancies,
      };

      renderWithProviders(<VacanciesList />, preloadedState);

      expect(screen.queryByText(/Поиск:/i)).not.toBeInTheDocument();
    });
  });


  describe('Побочные эффекты', () => {
    it('вызывает fetchVacancies при монтировании компонента', async () => {
    console.log('=== ТЕСТ fetchVacancies ===');


    (useSearchParams as any).mockReturnValue([
      new URLSearchParams({ text: '', area: '1'  }),
    ]);

    mockFetchVacancies.mockClear();
    mockFetchVacancies.mockImplementation((params) => {
      console.log('fetchVacancies ВЫЗВАН! Параметры:', params);
      return Promise.resolve([
        { id: 'test-1', name: 'Test Vacancy', employer: { name: 'Test' } }
      ]);
    });
    

    const store = configureStore({
      reducer: {
        vacancy: vacanciesReducer,
      },
      preloadedState: {
        vacancy: {
          vacancies: [],
          loading: false,
          error: null,
        },
      },
    });
    
    console.log('Store до рендера:', store.getState().vacancy);
    
    render(
      <Provider store={store}>
        <VacanciesList />
      </Provider>
    );
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('Store после рендера:', store.getState().vacancy);
    console.log('Loading в store:', store.getState().vacancy.loading); 

    console.log('Mock вызовов:', mockFetchVacancies.mock.calls.length);
    
  });

});

  describe('Крайние случаи', () => {

    it('не падает при отсутствии вакансий', () => {
      const preloadedState: VacanciesState = {
        ...mockInitialState,
        vacancies: [],
      };

      expect(() => {
        renderWithProviders(<VacanciesList />, preloadedState);
      }).not.toThrow();
    });
});
