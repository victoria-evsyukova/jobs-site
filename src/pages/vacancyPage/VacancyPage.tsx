import Skills from "../../skills/Skills";
import VacanciesList from "../../vacanciesList/VacanciesList";
import { Grid } from "@mantine/core";
import FilteredCity from "../../filteredCity/FilteredCity";

export default function VacancyPage() {
    return (
        <Grid 
            justify="center"  
            maw={1440} 
            gutter={1}
        >
            <Grid.Col 
                span={2.9} 
                
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <Skills />
                    <FilteredCity />
                </div>
            </Grid.Col>
            
            <Grid.Col span={5.5} >
                <VacanciesList />
            </Grid.Col>
        </Grid>
    );
}