import { useEffect, useState } from 'react';
import { Combobox, useCombobox, Flex, PillsInput,  } from '@mantine/core';
import style from './FilteredCity.module.css';
import { IconMapPin } from '@tabler/icons-react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function FilteredCity() {
    const navigate = useNavigate();
    const { city: currentCity } = useParams();
    const [ searchParams ] = useSearchParams();
    const combobox = useCombobox();
    const [value, setValue] = useState('');

    const cityMapping: Record<string, string> = {
        'Все города': 'all-cities',
        'Москва': 'moscow',
        'Санкт-Петербург': 'peterburg',
    };
    
    const reverseCityMapping: Record<string, string> = {
        'all-cities': 'Все города',
        'moscow': 'Москва',
        'peterburg': 'Санкт-Петербург',
    };

    useEffect(() => {
        const cityName = currentCity ? reverseCityMapping[currentCity] : 'Все города';
        setValue(cityName || 'Все города');
    }, [currentCity]);

    const handleCitySelect = (cityName: string) => {
        const cityValue = cityMapping[cityName];
        
        if (!cityValue) return;
        
        setValue(cityName);
        combobox.closeDropdown();
    
        const newParams = new URLSearchParams(searchParams);
        
        newParams.set('page', '1');
        
        navigate(`/vacancies/${cityValue}`);
    };

    return (
        <Flex w={317} h={84} bg={'white'} bdrs={'12px'} align={'center'} justify={'center'}>
            <Combobox 
                store={combobox}
                onOptionSubmit={handleCitySelect}
            >
                <Combobox.Target>
                    
                    <PillsInput w={269} h={36}
                        onClick={() => combobox.toggleDropdown()}
                        rightSection={<Combobox.Chevron />}
                        leftSection={<IconMapPin size={16} stroke={1.3} />} 
                        classNames={{ input: style['input-focus']}}
                    >
                        <PillsInput.Field
                            placeholder="Все города"
                            value={value}
                            readOnly
                            classNames={{ field: style['input-field']}}
                        />

                    </PillsInput>
                </Combobox.Target>

                <Combobox.Dropdown className={style.combobox}>
                    <Combobox.Options>
                        {Object.entries(cityMapping).map(([name, id]) => (
                            <Combobox.Option key={id} value={name}>
                                {name}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </Flex>
    );
}
