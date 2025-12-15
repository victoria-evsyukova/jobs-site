import { Card, Text, Flex, Button } from '@mantine/core';
import type { Vacancy } from '../../types/vacancies';
import style from './Vacany.module.css';

interface VacancyType {
    vacancy: Vacancy;
}

export default function Vacancy ({ vacancy }: VacancyType) {

    const { salary, experience, schedule, employer, area, alternate_url } = vacancy;

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
        } else if (lowerExp.startsWith('опыт')) {
            return experience;
        }
        
        return `Опыт ${experience}`;
    };
    
    const formattedExperience = formatExperience(experience.name);
    const formattedSalary = formatSalary();
    const workFormat = getWorkFormat();
    

    const handleApplyClick = () => {
        window.open(alternate_url, '_blank', 'noopener,noreferrer')
    }


    return (
        <Card w={659} h={248} bdrs={'12px'} p={24}>
            <Text c={'#364FC7'} size='20px' fw={600} lineClamp={1}
                className={style['vacancy-title']}    
            >{vacancy.name}</Text>
            <Flex gap={'14px'} mt={'8px'} align={'center'}>
                <Text size='sm'>{formattedSalary}</Text>
                <Text size='sm' c={'#0F0F1080'} pt={'3px'}>{formattedExperience}</Text>
            </Flex>
            <Text fw={400} size='sm' c={'#0F0F1080'} mt={'20px'}>{employer.name}</Text>
            <Text w={'fit-content'} px={'4px'} pb={'1px'} pt={'0px'}
                size='xs' mt={'8px'} fw={700} bdrs={'5px'}
                c={workFormat === 'Офис' ? '#0F0F1080' : '#FFFFFF'}
                bg={
                    workFormat === 'Можно удалённо' 
                    ? '#4263EB' 
                    : workFormat === 'Гибрид' 
                    ? 'black' 
                    : '#0F0F101A'
                } 
                >
                    {workFormat}
            </Text>
            <Text c={'#0F0F10'} fw={400} size='lg' mt={5} pb={'14px'}>{area.name}</Text>

            <Flex gap={'10px'}>
                <Button bg={'black'} fw={400} className={style['button']}>Смотреть вакансию</Button>
                <Button bg={'#0F0F101A'} c={'#0F0F10'} fw={400} 
                    className={style['button']} onClick={handleApplyClick}>
                        Откликнуться
                    </Button>
            </Flex>

        </Card>
    )
}