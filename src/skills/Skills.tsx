import { useSearchParams } from 'react-router';
import plus from '../assets/img/Vector.svg';
import style from './Skills.module.css';
import { Flex, Text, PillsInput, Pill, Button, Image } from "@mantine/core";
import { useState } from "react";
import { parseSkillsFromUrl, DEFAULT_SKILLS } from '../utils/skillsUtils';


export default function Skills () {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ inputValue, setInputValue ] = useState('');

    const skillsParam = searchParams.get('skills');
    
    const skills = skillsParam === '[]' 
        ? [] 
        : parseSkillsFromUrl(skillsParam);

    const updateSkills = (newSkills: string[]) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (newSkills.length === 0) {
            newParams.set('skills', '[]'); // Удаляем параметр, если массив пустой
        } else {
            newParams.set('skills', JSON.stringify(newSkills));
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };


    const handleAddSkills = () => {
        if (inputValue.trim() === '') return;

        const skillToAdd = inputValue.trim();
        
        if (!skills.includes(skillToAdd)) {
            updateSkills([...skills, skillToAdd]);
            setInputValue('');
        }
    };


    const handleRemoveSkill = (skillToRemove: string) => {
        const newSkills = skills.filter(skill => skill !== skillToRemove);
        
        updateSkills(newSkills);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkills();
        }
    }


    return (
        <Flex w={317} h={206} bg={'white'} bdrs={'12px'} p={24} direction={'column'} >
            <Text size={'14px'} fw={600} c={'#212529'} pb={'15px'}>Ключевые навыки</Text>
            
            <Flex align="center" gap={8} >
                <PillsInput w={227} h={30} classNames={{ input: style['pills-input']}} >

                    <PillsInput.Field placeholder="Навык" 
                        classNames={{field: style['pills-input-field']}} 
                        onChange={(e) => setInputValue(e.currentTarget.value)}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                    />

                </PillsInput>
                
                <Button 
                    w={34} 
                    h={30}
                    p={0}
                    bg={inputValue.trim() === '' ? '#96c5eeff' : '#4263EB'}
                    bdrs={8}
                    onClick={handleAddSkills}
                    disabled={inputValue.trim() === ''}
                >
                    <Image src={plus} w={15} h={15} />
                    
                </Button>
            </Flex>
            
            <Pill.Group mt="md" gap={8} style={{ overflow: 'auto'}} >
                {skills.map((skill) => (
                    <Pill
                        key={skill}
                        size="sm"
                        pl={12} pr={7}
                        withRemoveButton
                        onRemove={() => handleRemoveSkill(skill)} 
                        styles={{ remove: {color: '#0F0F104D', fontWeight: 700}}}

                    > {skill}

                    </Pill>
                ))}
            </Pill.Group>
        </Flex>
    )
}