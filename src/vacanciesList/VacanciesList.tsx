import { Box, Flex, Loader, Pagination, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import type { RootState } from "../redux/store/store";
import { useTypedDispatch, useTypedSelector } from "../redux/hooks/redux";
import { fetchVacancies } from "../redux/features/api/vacanciesApi";
import Vacancy from "../features/vacancy/Vacancy";
import style from './VacanciesList.module.css';

export default function VacanciesList () {

    const { vacancies, loading, error, searchParams } = useTypedSelector((state: RootState) => state.vacancy);
    const dispatch = useTypedDispatch();
    const [ activePage, setActivePage ] = useState(1);

     useEffect(() => {
        const requestParams: any = {
            page: activePage, 
            per_page: 8,
            area: searchParams.area,
        };
        
        if (searchParams.text) {
            requestParams.text = searchParams.text;
        }
        
        dispatch(fetchVacancies(requestParams));
    }, [dispatch, activePage, searchParams]);

    useEffect(() => {
        setActivePage(1)
    }, [searchParams])



    if (loading) {
        return (
            <Box className={style['loader']}>
                <Loader size="lg" />
            </Box>
        );
    }


  if (error) return <div>Error: {error}</div>

    return (
        <Flex direction={'column'} gap={'md'}>
            {searchParams.text && (
                <Text size="sm" color="dimmed">
                    Поиск: "{searchParams.text}"
                </Text>
            )}

           {vacancies.length === 0 ? (
                <Text ta="center" size="lg" mt="xl">
                    {searchParams.text 
                        ? `По запросу "${searchParams.text}" вакансий не найдено`
                        : "Вакансий пока нет"}
                </Text>
            ) : (
                <>
                    {vacancies.map(vacancy => (
                        <Vacancy key={vacancy.id} vacancy={vacancy} />
                    ))}
                    
                    <Flex justify={'center'} align={'center'} mt={10}>
                        <Pagination.Root 
                            total={10}
                            color={'#4263EB'}
                            value={activePage}
                            onChange={setActivePage}
                        >
                            <Group gap={5} justify="center">
                                <Pagination.First />
                                <Pagination.Previous />
                                <Pagination.Items />
                                <Pagination.Next />
                                <Pagination.Last />
                            </Group>
                        </Pagination.Root>
                    </Flex>
                </>
            )}
        </Flex>
    )
}