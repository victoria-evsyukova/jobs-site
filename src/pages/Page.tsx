import { Container } from "@mantine/core";
import style from './Page.module.css'
import type { ReactNode } from "react";


interface PageProps {
    children?: ReactNode
}

export default function Page ({ children}: PageProps) {

    return (
        <Container className={style.container}>
            {children}
        </Container>
    )
}