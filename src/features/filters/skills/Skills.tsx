import { useSearchParams } from 'react-router';
import { 
    Flex, 
    Text, 
    PillsInput, 
    Pill, 
    Button, 
    Paper, 
    Group, 
    Badge,
    ActionIcon,
    Tooltip,
    Stack,
    Divider
} from "@mantine/core";
import { 
    IconPlus, 
    IconX, 
    IconSearch, 
    IconSparkles,
    IconTrash,
    IconCheck,
    IconTags,
    IconBulb
} from '@tabler/icons-react';
import { useState, useEffect, useRef } from "react";
import { parseSkillsFromUrl } from '../../../utils/skillsUtils';
import style from './Skills.module.css';


const POPULAR_SKILLS = [
    'React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js',
    'Redux', 'CSS', 'HTML', 'Git', 'Webpack', 'GraphQL', 'REST API',
    'Vue.js', 'Angular', 'SASS', 'Tailwind', 'Jest', 'Docker'
];

export default function Skills() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [skills, setSkills] = useState<string[]>([]);

    
     useEffect(() => {
        const skillsParam = searchParams.get('skills');
        const parsedSkills = skillsParam === '[]' ? [] : parseSkillsFromUrl(skillsParam);
        setSkills(parsedSkills);
    }, [searchParams]);

    // Фильтрация популярных навыков для подсказок
    useEffect(() => {
        if (inputValue.trim() && isFocused) {
            const filtered = POPULAR_SKILLS.filter(skill =>
                skill.toLowerCase().includes(inputValue.toLowerCase()) &&
                !skills.includes(skill)
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [inputValue, skills, isFocused]);


    const updateSkills = (newSkills: string[]) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (newSkills.length === 0) {
            newParams.set('skills', '[]');
        } else {
            newParams.set('skills', JSON.stringify(newSkills));
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handleAddSkills = (skill?: string) => {
        const skillToAdd = skill || inputValue.trim();
        
        if (skillToAdd === '') return;
        
        if (!skills.includes(skillToAdd)) {
            updateSkills([...skills, skillToAdd]);
            if (!skill) setInputValue('');
            setSuggestions([]);
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const newSkills = skills.filter(skill => skill !== skillToRemove);
        updateSkills(newSkills);
    };

    const handleClearAll = () => {
        if (skills.length > 0) {
            updateSkills([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkills();
        } else if (e.key === 'Escape') {
            setInputValue('');
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleAddSkills(suggestion);
    };

    return (
        <Paper 
            className={style.skillsContainer}
            radius="lg"
            p="xl"
            withBorder
            shadow="sm"
        >
            {/* Заголовок с иконкой */}
            <Group justify="space-between" align="center" mb="lg">
                <Group gap="sm">
                    <div className={style.titleIcon}>
                        <IconTags size={22} />
                    </div>
                    <div>
                        <Text size="lg" fw={700} className={style.title}>
                            Ключевые навыки
                        </Text>
                        <Text size="xs" c="dimmed" className={style.subtitle}>
                            Добавьте навыки для поиска релевантных вакансий
                        </Text>
                    </div>
                </Group>
                
                {skills.length > 0 && (
                    <Tooltip label="Очистить все" position="top">
                        <ActionIcon 
                            variant="subtle" 
                            color="red" 
                            size="sm"
                            onClick={handleClearAll}
                            className={style.clearAllButton}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Group>

            {/* Поле ввода с подсказками */}
            <div className={style.inputContainer}>
                <Group gap="xs" className={style.inputGroup}>
                    
                    
                    <PillsInput 
                        className={style.pillsInput}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        bdrs={20}
                    >
                        <IconSearch size={18} color='grey'/>
                         
                        <PillsInput.Field
                            placeholder="Введите навык..."
                            className={style.inputField}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.currentTarget.value)}
                            onKeyDown={handleKeyDown}
                            bdrs={20}
                        />
                    </PillsInput>
                        <Pill.Group className={style.pillGroup}>
                            {skills.map((skill) => (
                                <Pill
                                    key={skill}
                                    size="sm"
                                    className={style.skillPill}
                                    withRemoveButton
                                    onRemove={() => handleRemoveSkill(skill)}
                                >
                                    {skill}
                                </Pill>
                            ))}
                            
                            
                        </Pill.Group>
                    

                    <Button
                        className={style.addButton}
                        onClick={() => handleAddSkills()}
                        disabled={!inputValue.trim()}
                        leftSection={<IconPlus size={18} />}
                        radius="md"
                    >
                        Добавить
                    </Button>
                </Group>

                {/* Подсказки */}
                {suggestions.length > 0 && (
                    <Paper className={style.suggestionsContainer} shadow="md">
                        <Stack gap={0}>
                            <Group px="sm" py="xs" className={style.suggestionsHeader}>
                                <IconSparkles size={14} />
                                <Text size="xs" fw={500}>Популярные навыки</Text>
                            </Group>
                            <Divider />
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    className={style.suggestionItem}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    <Text size="sm">{suggestion}</Text>
                                    <IconPlus size={14} />
                                </button>
                            ))}
                        </Stack>
                    </Paper>
                )}

            </div>

            {/* Статистика */}
            {skills.length > 0 && (
                <Group justify="space-between" mt="lg" className={style.stats}>
                    <Badge 
                        variant="light" 
                        color="blue" 
                        size="lg"
                        leftSection={<IconCheck size={14} />}
                    >
                        Навыки: {skills.length} 
                    </Badge>
                    
                    <Tooltip label="Чем больше навыков, тем точнее поиск">
                        <Group gap={4}>
                            <IconBulb size={16} className={style.tipIcon} />
                            <Text size="xs" c="dimmed">Добавьте все ключевые навыки</Text>
                        </Group>
                    </Tooltip>
                </Group>
            )}

            {/* Быстрые навыки */}
            <div className={style.quickSkills}>
                <Text size="sm" fw={600} mb="xs" className={style.quickSkillsTitle}>
                    Быстрый выбор:
                </Text>
                <Flex wrap="wrap" gap={8}>
                    {POPULAR_SKILLS.map((skill) => (
                        <Badge
                            key={skill}
                            variant={skills.includes(skill) ? "filled" : "outline"}
                            color={skills.includes(skill) ? "blue" : "gray"}
                            size="sm"
                            className={style.quickSkillBadge}
                            onClick={() => 
                                skills.includes(skill) 
                                    ? handleRemoveSkill(skill)
                                    : handleAddSkills(skill)
                            }
                        >
                            {skill}
                            {skills.includes(skill) && <IconX size={12} />}
                        </Badge>
                    ))}
                </Flex>
            </div>
        </Paper>
    );
}