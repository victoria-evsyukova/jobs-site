import { screen, waitFor } from '@testing-library/react';
import { render } from '../../../test/utils';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilteredCity from './FilteredCity';


const mockDispatch = vi.fn();

vi.mock('../redux/hooks/redux', () => ({
  useTypedDispatch: () => mockDispatch,
}));

vi.mock('../redux/features/slices/VacanciesSlice', () => ({
  setSearchParams: vi.fn((params) => ({
    type: 'vacancies/setSearchParams',
    payload: params,
  })),
}));

// Мокаем иконку
vi.mock('@tabler/icons-react', () => ({
  IconMapPin: () => <div data-testid="map-pin-icon">📍</div>,
}));

describe('FilteredCity Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    vi.clearAllMocks();
  });

  const renderWithStore = () => {
    const store = configureStore({
      reducer: {
        vacancy: () => ({ searchParams: { area: '' } }),
      },
    });

    return render(
      <Provider store={store}>
        <FilteredCity />
      </Provider>
    );
  };

  describe('Рендеринг', () => {
    it('рендерит компонент без ошибок', () => {
      renderWithStore();
      expect(screen.getByPlaceholderText('Все города')).toBeInTheDocument();
    });

    it('отображает иконку карты', () => {
      renderWithStore();
      expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument();
    });
  });

  describe('Поведение выпадающего списка', () => {
    it('открывает выпадающий список при клике на поле ввода', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Кликаем чтобы открыть dropdown
      await user.click(input);

      // Проверяем что опции появились
      expect(screen.getByText('Все города')).toBeInTheDocument();
      expect(screen.getByText('Москва')).toBeInTheDocument();
      expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    });

    it('показывает выбранный город в поле ввода', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Открываем и выбираем Москву
      await user.click(input);
      await user.click(screen.getByText('Москва'));

      // Проверяем что значение обновилось
      expect(input).toHaveValue('Москва');
    });
  });

  describe('Выбор городов и dispatch', () => {
    it('диспатчит setSearchParams при выборе "Все города"', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Открываем и выбираем "Все города"
      await user.click(input);
      await user.click(screen.getByText('Все города'));

      // Проверяем dispatch
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'vacancies/setSearchParams',
        payload: { area: '' },
      });
    });

    it('диспатчит setSearchParams при выборе Москвы', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Открываем и выбираем Москву
      await user.click(input);
      await user.click(screen.getByText('Москва'));

      // Проверяем dispatch с правильным ID
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'vacancies/setSearchParams',
        payload: { area: '1' },
      });
    });

    it('диспатчит setSearchParams при выборе Санкт-Петербурга', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Открываем и выбираем Санкт-Петербург
      await user.click(input);
      await user.click(screen.getByText('Санкт-Петербург'));

      // Проверяем dispatch с правильным ID
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'vacancies/setSearchParams',
        payload: { area: '2' },
      });
    });
  });

  describe('Маппинг городов', () => {
    it('правильно маппит названия городов на ID', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Проверяем маппинг для каждого города
      const testCases = [
        { city: 'Все города', expectedId: '' },
        { city: 'Москва', expectedId: '1' },
        { city: 'Санкт-Петербург', expectedId: '2' },
      ];

      for (const { city, expectedId } of testCases) {
        mockDispatch.mockClear();
        
        await user.click(input);
        await user.click(screen.getByText(city));

        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'vacancies/setSearchParams',
          payload: { area: expectedId },
        });
      }
    });
  });

  describe('Поле ввода', () => {
    it('поле ввода только для чтения', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Пытаемся ввести текст
      await user.type(input, 'Новый город');
      
      // Значение не должно измениться (только через выбор из списка)
      expect(input).toHaveValue('');
    });

    it('открывает dropdown при клике на поле', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Клик открывает dropdown
      await user.click(input);
      
      expect(screen.getByText('Москва')).toBeInTheDocument();
      expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    });
  });

  describe('Крайние случаи', () => {
    it('работает при множественных быстрых кликах', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Быстро кликаем несколько раз
      await user.click(input);
      await user.click(input);
      await user.click(input);
      
      // Компонент не должен ломаться
      expect(screen.getByText('Москва')).toBeInTheDocument();
    });

    it('сохраняет выбранное значение при переоткрытии', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Выбираем Москву
      await user.click(input);
      await user.click(screen.getByText('Москва'));
      
      // Проверяем что значение сохранилось
      expect(input).toHaveValue('Москва');
      
      // Открываем снова
      await user.click(input);
      
      // Dropdown должен открыться снова
      expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('имеет доступный placeholder', () => {
      renderWithStore();
      expect(screen.getByPlaceholderText('Все города')).toBeInTheDocument();
    });

    it('опции имеют правильные значения', async () => {
      const user = userEvent.setup();
      renderWithStore();

      await user.click(screen.getByPlaceholderText('Все города'));
      
      // Проверяем что опции имеют правильные value
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);
      
      const optionValues = options.map(opt => opt.getAttribute('value'));
      expect(optionValues).toEqual(['Все города', 'Москва', 'Санкт-Петербург']);
    });

    it('правильно управляется с клавиатуры', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Фокус на поле ввода
      await user.tab();
      expect(input).toHaveFocus();
      
      // Нажатие Enter должно открыть dropdown
      await user.keyboard('[Enter]');
      
      // Проверяем что dropdown открылся
      await waitFor(() => {
        expect(screen.getByText('Москва')).toBeInTheDocument();
      });
    });
  });

  describe('Интеграционные тесты', () => {
    it('полный цикл выбора города', async () => {
      const user = userEvent.setup();
      renderWithStore();

      // 1. Начальное состояние
      const input = screen.getByPlaceholderText('Все города');
      expect(input).toHaveValue('');
      
      // 2. Открываем dropdown
      await user.click(input);
      expect(screen.getByText('Москва')).toBeInTheDocument();
      expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
      
      // 3. Выбираем город
      await user.click(screen.getByText('Санкт-Петербург'));
      
      // 4. Проверяем результат
      expect(input).toHaveValue('Санкт-Петербург');
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'vacancies/setSearchParams',
        payload: { area: '2' },
      });
      
      // 5. Проверяем что dropdown закрылся
      expect(screen.queryByText('Москва')).not.toBeVisible();;
    });

    it('меняет выбранный город', async () => {
      const user = userEvent.setup();
      renderWithStore();

      const input = screen.getByPlaceholderText('Все города');
      
      // Сначала выбираем Москву
      await user.click(input);
      await user.click(screen.getByText('Москва'));
      expect(input).toHaveValue('Москва');
      
      // Потом меняем на Санкт-Петербург
      await user.click(input);
      await user.click(screen.getByText('Санкт-Петербург'));
      expect(input).toHaveValue('Санкт-Петербург');
      
      // Проверяем что оба раза был dispatch
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'vacancies/setSearchParams',
        payload: { area: '1' },
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: 'vacancies/setSearchParams',
        payload: { area: '2' },
      });
    });
  });
});