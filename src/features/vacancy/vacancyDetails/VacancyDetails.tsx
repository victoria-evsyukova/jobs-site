import { useLocation, useParams } from "react-router";
import VacancyCard from "../VacancyCard/VacancyCard";
import { Flex, Text, Box } from "@mantine/core";
import { useTypedSelector } from "../../../redux/hooks/redux";
import type { RootState } from "../../../redux/store/store";

export default function VacancyDetails () {
    const { id } = useParams();
    const { vacancies } = useTypedSelector((state: RootState) => state.vacancy);

    const vacancy = vacancies.find(v => v.id === id);
    
    if (!vacancy) {
        return (
            <Flex justify="center" align="center" h={400}>
                <Text size="lg" c="gray">Вакансия не найдена</Text>
            </Flex>
        );
    }

    return (
        <Flex direction={'column'} align={'center'} mt={22}>
            
            <VacancyCard vacancy={vacancy} isDetailed={true} />

            <Box w={658} h={492} bg={'white'} bdrs={'12px'} p={24} mt={28}>
                <Text size="xl" fw={600} mb={10}>Требования</Text>
                <Text mb={23}>{vacancy.snippet?.requirement}</Text>
                <Text size="md" fw={600} mb={10}>Ответственность</Text>
                <Text>{vacancy.snippet?.responsibility}</Text>
            </Box>
            
        </Flex>
    )
}