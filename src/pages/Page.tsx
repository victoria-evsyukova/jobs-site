import { Container } from "@mantine/core";
import Header from "../widgets/header/Header";
import style from './Page.module.css'
import MainPage from "./mainPage/MainPage";


export default function Page () {

    return (
        <Container className={style.container}>
            <Header />

            <MainPage />
        </Container>
    )
}