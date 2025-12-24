import { Container } from "@mantine/core";
import style from './HomePage.module.css'
import VacanciesPage from "../vacanciesPage/VacanciesPage";



export default function HomePage () {

    return (
        <Container className={style.container}>
            <VacanciesPage />
        </Container>
    )
}