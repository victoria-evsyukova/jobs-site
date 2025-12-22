import {type Vacancy } from '../types/vacancies';

export const formatVacancyData = (vacancy: Vacancy) => {
    const { salary, experience, schedule } = vacancy;

    const formatSalary = () => {
        if (!salary) {
            return 'Зарплата не указана';
        }

        const { from, to, currency } = salary;
        const currencySymbol = currency === 'RUR' || currency === 'RUB' ? '₽' : currency;

        if (from && to) {
            return `${from.toLocaleString()} – ${to.toLocaleString()} ${currencySymbol}`;
        } else if (from) {
            return `от ${from.toLocaleString()} ${currencySymbol}`;
        } else if (to) {
            return `до ${to.toLocaleString()} ${currencySymbol}`;
        }
        return 'Зарплата не указана';
    };

    
    const getWorkFormat = () => {
         if (!schedule || !schedule.name) {
            return 'Офис';
        }
        const scheduleName = schedule.name.toLowerCase();
        
        if (scheduleName.includes('удален') || scheduleName.includes('remote')) {
            return 'Можно удалённо';
        } else if (scheduleName.includes('гибр') || scheduleName.includes('shift') || scheduleName.includes('сменн')) {
            return 'Гибрид';
        } else {
            return 'Офис';
        }
    };
    
    const formatExperience = (experience: string): string => {
        if (!experience) return 'Опыт не указан';
        
        const lowerExp = experience.toLowerCase().trim();
        if (lowerExp === 'от 1 года до 3 лет' || lowerExp === '1-3 года') {
            return 'Опыт 1-3 года';
        } else if (lowerExp === 'от 3 до 6 лет' || lowerExp === '3-6 лет') {
            return 'Опыт 3-6 лет';
        } else if (lowerExp.startsWith('нет')) {
            return 'Без опыта';
        }
        
        return `Опыт ${experience}`;
    };
    

    return {
        formattedExperience: formatExperience(experience.name),
        formattedSalary: formatSalary(),
        workFormat: getWorkFormat(),
    }
    
    

}