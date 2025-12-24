import { Tabs } from "@mantine/core";
import classes from './CityTabs.module.css';
import { useNavigate, useParams, useSearchParams } from "react-router";


export default function () {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { city: currentCity } = useParams();

    const activeTab = currentCity || 'moscow';


    const handleTabChange = (value: string | null) => {
        if (!value) return;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '1'); // Сбрасываем пагинацию
        
        
        // Навигация с сохранением всех query параметров
        navigate(`/vacancies/${value}`);

    }

    return (
        <Tabs defaultValue="moscow" mb={30} variant="unstyled" 
            classNames={{ tab: classes.tab}}
            value={activeTab}
            onChange={handleTabChange}
        >
            <Tabs.List>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="peterburg">Санкт-Петербург</Tabs.Tab>
                <Tabs.Tab value="all-cities" c={'grey'}>Все города</Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}