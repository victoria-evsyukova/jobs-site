import { Flex, Pagination, Group, Text } from "@mantine/core";
import { useEffect, useMemo } from "react";
import type { RootState } from "../redux/store/store";
import { useTypedDispatch, useTypedSelector } from "../redux/hooks/redux";
import { fetchVacancies } from "../redux/features/api/vacanciesApi";
import VacancyCard from "../features/vacancy/VacancyCard/VacancyCard";
import { useParams, useSearchParams } from "react-router";
import { parseSkillsFromUrl } from "../utils/skillsUtils";

export default function VacanciesList () {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { vacancies, error } = useTypedSelector((state: RootState) => state.vacancy);
    const dispatch = useTypedDispatch();
    const { city } = useParams();

    const text = searchParams.get('text') || '';
    const skillsParam = searchParams.get('skills');
    const pageParam = searchParams.get('page') || '1';

    const skills = useMemo(() => {
        return parseSkillsFromUrl(skillsParam);
    }, [skillsParam]);


    const currentPage = parseInt(pageParam);
    
     useEffect(() => {
        const requestParams: any = {
            page: currentPage, 
            per_page: 8,
            city: city,
            text: text || undefined,
            skill_set: skills,
        };
        
        dispatch(fetchVacancies(requestParams));
    }, [dispatch, currentPage, text, city, skills]);


    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        setSearchParams(newParams);
        window.history.replaceState({}, '', `?${newParams.toString()}`);
    };


  if (error) return <div>Error: {error}</div>

    return (
        <Flex direction={'column'} gap={'md'}>
            {text && (
                <Text size="sm" color="dimmed">
                    Поиск: "{text}"
                </Text>
            )}

           {vacancies.length === 0 ? (
                <Text ta="center" size="lg" mt="xl">
                    {text 
                        ? `По запросу "${text}" вакансий не найдено`
                        : ""}
                </Text>
            ) : (
                <>
                    {vacancies.map((vacancy) => (
                        <VacancyCard key={vacancy.id} vacancy={vacancy} />
                    ))}
                    
                    <Flex justify={'center'} align={'center'} mt={10}>
                        <Pagination.Root 
                            total={10}
                            color={'#4263EB'}
                            value={currentPage}
                            onChange={handlePageChange}
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