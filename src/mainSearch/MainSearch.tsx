import { TextInput, Button } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import style from './MainSearch.module.css';
import { useTypedDispatch } from "../redux/hooks/redux";
import { setSearchParams } from '../redux/features/slices/VacanciesSlice'
import { useState } from "react";



export default function MainSearch () {
    const dispatch = useTypedDispatch();
    const [ searchText, setSearchText ] = useState('');

    const handleSearch = () => {
        if (searchText.trim()) {
            dispatch(setSearchParams({ text: searchText }))
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <>
            <TextInput 
                placeholder="Должность или название компании"
                size="md"
                h={42}
                w={'403px'}
                radius={'md'}
                leftSection={<IconSearch size={16} />}
                classNames={{ input: style['input-focus']}}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyPress}
               
            />
            <Button size="md" color="#4263EB" fw={300}
                onClick={handleSearch}
                   
            > 
                Найти
            </Button>
        </>
    )
}