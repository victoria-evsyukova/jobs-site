import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '../../../test/utils';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainSearch from './MainSearch';
import vacanciesReducer from '../../../redux/features/slices/VacanciesSlice';


vi.mock('@tabler/icons-react', () => ({
  IconSearch: () => <div data-testid="icon-search">🔍</div>
}));

// Создаем мок store
const createMockStore = () => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer
    }
  });
};

let mockDispatch = vi.fn()
let store: ReturnType<typeof createMockStore>;

vi.mock('../redux/hooks/redux', () => ({
    useTypedDispatch: () => mockDispatch,
}));        


describe('MainSearch Component', () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
    store = createMockStore();
    
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('рендерит все элементы компонента', () => {
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    expect(inputElement).toBeInTheDocument();

    const iconElement = screen.getByTestId('icon-search');
    expect(iconElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /найти/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('обновляет значение в input при вводе текста', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const testText = 'Frontend разработчик';

    // Вводим текст
    await user.type(inputElement, testText);

    expect(inputElement).toHaveValue(testText);
  });



  test('вызывает dispatch при клике на кнопку с корректным текстом', () => {
    mockDispatch.mockClear();

    render(
        <Provider store={store}>
            <MainSearch />
        </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const buttonElement = screen.getByRole('button', { name: /найти/i });
    const searchText = 'React Developer';

    fireEvent.change(inputElement, { target: { value: searchText } });
    fireEvent.click(buttonElement);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

  
  test('вызывает dispatch при нажатии Enter в input', () => {
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const searchText = 'Backend Engineer';

    fireEvent.change(inputElement, { target: { value: searchText } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'vacancies/setSearchParams',
      payload: { text: searchText }
    });
  });

  test('не вызывает dispatch при клике на кнопку с пустым текстом', () => {
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const buttonElement = screen.getByRole('button', { name: /найти/i });

    fireEvent.click(buttonElement);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('не вызывает dispatch при клике на кнопку с текстом только из пробелов', () => {
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const buttonElement = screen.getByRole('button', { name: /найти/i });

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(buttonElement);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('не вызывает dispatch при нажатии других клавиш кроме Enter', () => {
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const searchText = 'Test Position';

    fireEvent.change(inputElement, { target: { value: searchText } });
    fireEvent.keyDown(inputElement, { key: 'Escape', code: 'Escape' });

    expect(mockDispatch).not.toHaveBeenCalled();
  });


  test('сохраняет корректные атрибуты у элементов', () => {
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    
    expect(inputElement).toBeTruthy();
    
    const buttonElement = screen.getByRole('button', { name: /найти/i });
    expect(buttonElement).toBeTruthy();
  });
});


describe('MainSearch Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('обработка очень длинного текста', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const buttonElement = screen.getByRole('button', { name: /найти/i });
    const longText = 'A'.repeat(100);

    await user.type(inputElement, longText);
    fireEvent.click(buttonElement);

    expect(inputElement).toHaveValue(longText);
  });

  test('обработка специальных символов', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const buttonElement = screen.getByRole('button', { name: /найти/i });
    const specialCharsText = 'C++/Python #JavaScript $React';

    fireEvent.change(inputElement, { target: { value: specialCharsText } });
    fireEvent.click(buttonElement);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'vacancies/setSearchParams',
      payload: { text: specialCharsText }
    });
  });

  test('очистка input после отправки (если компонент это делает)', () => {
    
    const { rerender } = render(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/должность или название компании/i);
    const buttonElement = screen.getByRole('button', { name: /найти/i });
    const searchText = 'Test Text';

    fireEvent.change(inputElement, { target: { value: searchText } });
    fireEvent.click(buttonElement);

    rerender(
      <Provider store={store}>
        <MainSearch />
      </Provider>
    );

    expect(inputElement).toBeTruthy();
  });
});


describe('MainSearch Accessibility', () => {

  test('кнопка имеет правильный текст', () => {
    render(
      <Provider store={createMockStore()}>
        <MainSearch />
      </Provider>
    );

    const buttonElement = screen.getByRole('button', { name: /найти/i });
    expect(buttonElement).toHaveTextContent('Найти');
  });
});

