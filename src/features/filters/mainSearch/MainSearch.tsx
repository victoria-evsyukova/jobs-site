import { TextInput, Button } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import style from './MainSearch.module.css';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";


export default function MainSearch () {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchText, setSearchText ] = useState('');

    useEffect(() => {
        const textFromUrl = searchParams.get('text') || '';
        setSearchText(textFromUrl)
    }, [searchParams])


    const handleSearch = () => {
        const newParams = new URLSearchParams(searchParams);
        
        if (searchText.trim()) {
            newParams.set('text', searchText.trim());
        } else {
            newParams.delete('text');
        }

        newParams.set('page', '1');

        setSearchParams(newParams);
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