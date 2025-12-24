import { Card, Text, Flex, Button } from '@mantine/core';
import type { Vacancy } from '../../../types/vacancies';
import style from './VacanyCard.module.css';
import { Link, useParams } from 'react-router-dom';
import { formatVacancyData } from '../../../utils/vacancyFormatter';

interface VacancyType {
    vacancy: Vacancy;
    isDetailed?: boolean;
}

export default function VacancyCard ({ vacancy, isDetailed = false }: VacancyType) {
    const { id, employer, area, alternate_url } = vacancy;
    const { city } = useParams();
    const { formattedExperience, formattedSalary, workFormat } = formatVacancyData(vacancy);

    const handleApplyClick = () => {
        window.open(alternate_url, '_blank', 'noopener,noreferrer')
    }


    return (
        <Card w={659} h={248} bdrs={'12px'} p={24}>
            <Text c={'#364FC7'} size='20px' fw={600}
                className={style['vacancy-title']}    
            >{vacancy.name}</Text>
            <Flex gap={'14px'} mt={'8px'} align={'center'}>
                <Text size='sm'>{formattedSalary}</Text>
                <Text size='sm' c={'#0F0F1080'} >{formattedExperience}</Text>
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
                 {!isDetailed && (
                    <Link to={`/vacancies/${city}/${id}`} state={{ vacancy }}>
                        <Button bg={'black'} fw={400} className={style['button']}>Смотреть вакансию</Button>
                    </Link>
                 )}
                <Button bg={isDetailed ? '#000000' : '#0F0F101A'} c={isDetailed ? 'white' : '#0F0F10'} fw={400} 
                    className={style['button']} onClick={handleApplyClick}>
                        {!isDetailed ? 'Откликнуться' : 'Откликнуться на hh.ru'}
                    </Button>
            </Flex>

        </Card>
    )
}