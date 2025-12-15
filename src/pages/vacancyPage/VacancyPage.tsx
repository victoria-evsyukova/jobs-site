import Skills from "../../skills/Skills";
import VacanciesList from "../../vacanciesList/VacanciesList";
import { Flex } from "@mantine/core";
import FilteredCity from "../../filteredCity/FilteredCity";


export default function VacancyPage() {


    return (
        <Flex justify={'center'} gap={'25px'} w={'1440px'} >
            <Flex direction={'column'} gap={15}>
                
                <Skills />

                <FilteredCity />
                
            </Flex>
            
            <VacanciesList />


        </Flex>
    )
}