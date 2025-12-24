import { Container, Text } from "@mantine/core";


export default function AboutPage () {
    return (
        <Container w={658} bg={'white'} bdrs={12} p={24} mt={30}>
            <Text size="26px" fw={700} mt={6} mb={20}>Евсюкова Виктория</Text>
            <Text>Привет! Я - Frontend-разработчик. 
                Пишу приложения на React + Typescipt + Redux Toolkit.</Text>
            <Text>Люблю Всё что связано с IT-технолониями, с разработкой, 
                с автоматизацией процессов, с логикой, при этом смешивая это с 
                креативностью, творчеством, разнообразием.
            </Text>
            <Text> Люби то что делаешь, и делай то что любишь.</Text> 
            <Text mt={10} mb={12}> © Конфуций: "Найди дело по душе, и не будешь работать ни один день..."</Text>
            
        </Container>
    )
}