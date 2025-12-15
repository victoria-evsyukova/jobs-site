import { Flex, Text, Container } from "@mantine/core";
import style from './MainPage.module.css';
import MainSearch from "../../mainSearch/MainSearch";
import VacancyPage from "../vacancyPage/VacancyPage";

export default function MainPage () {

    return (
        <>
        <Container mx={'auto'} my={'30px'} className={style['container-title']}>
            <Flex justify={'center'} mb={'25px'} gap={'40px'}>
                <Flex direction={'column'} mr={'30px'}>
                    <Text size="26px" fw={700}>Список вакансий</Text>
                    <Text fw={500} size="20px" c={'#0F0F1080'} pt={'10px'}> по профессии Frontend-разработчик</Text>
                
                </Flex>

                <Flex w={508} gap={'10px'} align={'center'} ml={'50px'}>
                    
                    <MainSearch />

                </Flex>
            </Flex>
        </Container>
        
        <VacancyPage />

        </>
       
    )
}