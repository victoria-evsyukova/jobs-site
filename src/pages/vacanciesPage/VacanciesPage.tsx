import { Flex, Text, Container, Grid } from "@mantine/core";
import style from './VacanciesPage.module.css';
import MainSearch from "../../features/filters/mainSearch/MainSearch";
import Skills from "../../features/filters/skills/Skills";
import FilteredCity from "../../features/filters/filteredCity/FilteredCity";
import CityTabs from "../../features/cityTabs/CityTabs";
import VacanciesList from "../../vacanciesList/VacanciesList";

export default function VacanciesPage () {

    return (
        <>
        <Container mx={'auto'} my={'30px'} className={style['container-title']}>
            <Flex justify={'center'} mb={'25px'} gap={'200px'} >
                <Flex direction={'column'} mr={'30px'}>
                    <Text size="26px" fw={700}>Список вакансий</Text>
                    <Text fw={500} size="20px" c={'#0F0F1080'} pt={'10px'}> по профессии Frontend-разработчик</Text>
                
                </Flex>

                <Flex w={508} gap={'10px'} align={'center'} ml={'50px'}>
                    
                    <MainSearch />

                </Flex>
            </Flex>
        </Container>
        

        <Grid 
            justify="center"  
            maw={1800} 
            gutter={30}
        >
            <Grid.Col 
                span={2.9} 
                
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <Skills />
                    <FilteredCity />
                </div>
            </Grid.Col>
            
            <Grid.Col span={4.5} >
                <CityTabs />
                <VacanciesList />
            </Grid.Col>
        </Grid>

        </>
       
    )
}