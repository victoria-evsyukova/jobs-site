import { useEffect, useState } from 'react';
import { Combobox, useCombobox, Flex, PillsInput,  } from '@mantine/core';
import style from './FilteredCity.module.css';
import { IconMapPin } from '@tabler/icons-react';
import { useSearchParams } from 'react-router';

export default function FilteredCity() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const combobox = useCombobox();
    const [value, setValue] = useState('');

    const cityMapping: Record<string, string> = {
        'Все города': '',
        'Москва': '1',
        'Санкт-Петербург': '2',
    };

    const reverseCityMapping: Record<string, string> = {
        '': 'Все города',
        '1': 'Москва',
        '2': 'Санкт-Петербург',
    };

    useEffect(() => {
        const areaFromUrl = searchParams.get('area') || '';
        const cityName = reverseCityMapping[areaFromUrl] || 'Все города';
        setValue(cityName);
    }, [searchParams])


    const handleCitySelect = (cityName: string) => {
        const cityId = cityMapping[cityName];
        
        setValue(cityName);
        combobox.closeDropdown();
    
        const newParams = new URLSearchParams(searchParams);

        if (cityId == '') {
            newParams.delete('area');
        } else {
            newParams.set('area', cityId);
        }
        
        newParams.set('page', '1');
        setSearchParams(newParams);
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
