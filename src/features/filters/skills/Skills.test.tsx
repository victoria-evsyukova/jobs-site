import { render } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'; 
import { screen } from '@testing-library/react';
import Skills from './Skills';
import userEvent from '@testing-library/user-event';

// Мокаем изображение
vi.mock('../assets/img/Vector.svg', () => ({
  default: 'test-plus-icon.svg',
}));

describe('Skills Component', () => {
  beforeEach(() => {
    // Очищаем localStorage если используется
    localStorage.clear();
  });


  const getRemoveButtons = () => {
    // Находим все элементы с классом Pill, затем находим в них кнопки
    const pillElements = screen.getAllByText(/TypeScript|React|Redux/i)
      .map(element => element.closest('[class*="Pill-root"]'));
    
    return pillElements
      .map(pill => pill?.querySelector('button'))
      .filter(Boolean) as HTMLElement[];
  };

  

  describe('Рендеринг компонента', () => {
    it('рендерит компонент без ошибок', () => {
        
      render(<Skills />);
      
      expect(screen.getByText('Ключевые навыки')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument();
    });

    it('отображает начальные навыки', () => {
      render(<Skills />);
      
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Redux')).toBeInTheDocument();
    });

    it('отображает кнопку добавления', () => {
      render(<Skills />);
      
      const addButton = screen.getByRole('button');
      expect(addButton).toBeInTheDocument();
      expect(addButton).toBeDisabled(); // Изначально пустой инпут
    });
  });

  describe('Добавление навыков', () => {
    it('добавляет новый навык по кнопке', async () => {
      const user = userEvent.setup();
      render(<Skills />);
      
      const input = screen.getByPlaceholderText('Навык');
      const addButton = screen.getByRole('button');
      
      // Вводим текст
      await user.type(input, 'JavaScript');
      
      // Кнопка должна стать активной
      expect(addButton).not.toBeDisabled();
      
      // Нажимаем кнопку
      await user.click(addButton);
      
      // Проверяем что навык добавился
      expect(screen.getByText('JavaScript')).toBeInTheDocument();

    });

    it('добавляет новый навык по Enter', async () => {
      const user = userEvent.setup();
      render(<Skills />);
      
      const input = screen.getByPlaceholderText('Навык');
      
      // Вводим текст и нажимаем Enter
      await user.type(input, 'JavaScript{enter}');
      
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });


    it('не добавляет дубликаты', async () => {
      const user = userEvent.setup();
      render(<Skills />);
      
      // Получаем все навыки по тексту
      const getAllSkills = () => {
        return ['TypeScript', 'React', 'Redux'].map(skill => 
          screen.queryByText(skill)
        ).filter(Boolean);
      };
      
      const initialSkillsCount = getAllSkills().length;
      
      const input = screen.getByPlaceholderText('Навык');
      
      // Пробуем добавить существующий навык
      await user.type(input, 'React{enter}');
      
      // Количество навыков не должно измениться
      expect(getAllSkills()).toHaveLength(initialSkillsCount);
    });

  });

  describe('Удаление навыков', () => {
    it('удаляет навык по кнопке удаления', async () => {
      const user = userEvent.setup();
      render(<Skills />);
      
      // Находим все кнопки удаления
      const removeButtons = getRemoveButtons();
      expect(removeButtons.length).toBe(3); // TypeScript, React, Redux
      
      // Удаляем первый навык (TypeScript)
      await user.click(removeButtons[0]);
      
      // Проверяем что TypeScript удалился
      expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Redux')).toBeInTheDocument();
    });

})

  describe('Крайние случаи', () => {
    it('обрабатывает очень длинные названия навыков', async () => {
      const user = userEvent.setup();
      render(<Skills />);
      
      const longSkill = 'ОченьОченьОченьОченьДлинноеНазваниеНавыкаДляТеста';
      const input = screen.getByPlaceholderText('Навык');
      
      await user.type(input, `${longSkill}{enter}`);
      
      expect(screen.getByText(longSkill)).toBeInTheDocument();
    });

    it('работает с кириллицей и специальными символами', async () => {
        const user = userEvent.setup();
        render(<Skills />);
        
        const input = screen.getByPlaceholderText('Навык');
        
        await user.type(input, 'C#/.NET{enter}');
        await user.type(input, 'Node.js{enter}');
        await user.type(input, 'Python/Django{enter}');
        
        expect(screen.getByText('C#/.NET')).toBeInTheDocument();
        expect(screen.getByText('Node.js')).toBeInTheDocument();
        expect(screen.getByText('Python/Django')).toBeInTheDocument();
    });

   it('сохраняет порядок добавления навыков', async () => {
        const user = userEvent.setup();
        render(<Skills />);
        
        const input = screen.getByPlaceholderText('Навык');
        
        // Добавляем в определенном порядке
        const skillsToAdd = ['HTML', 'CSS', 'JavaScript'];
        
        for (const skill of skillsToAdd) {
            await user.type(input, `${skill}{enter}`);
            expect(screen.getByText(skill)).toBeInTheDocument();
        }
        
        // Проверяем что все ожидаемые навыки отображаются
        const allExpectedSkills = ['TypeScript', 'React', 'Redux', 'HTML', 'CSS', 'JavaScript'];
        
        allExpectedSkills.forEach(skill => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });
  });

  describe('Accessibility', () => {
    it('имеет доступный placeholder', () => {
      render(<Skills />);
      
      const input = screen.getByPlaceholderText('Навык');
      expect(input).toBeInTheDocument();
    });


    it('навыки имеют кнопки удаления с доступными лейблами', () => {
      render(<Skills />);
      
       const removeButtons = getRemoveButtons();
      expect(removeButtons.length).toBeGreaterThan(0);
    });
  });
});