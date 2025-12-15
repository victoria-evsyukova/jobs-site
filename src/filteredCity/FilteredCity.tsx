import { useState } from 'react';
import { Combobox, useCombobox, Flex, PillsInput,  } from '@mantine/core';
import style from './FilteredCity.module.css';
import { IconMapPin } from '@tabler/icons-react';
import { useTypedDispatch } from '../redux/hooks/redux';
import { setSearchParams } from '../redux/features/slices/VacanciesSlice';

export default function FilteredCity() {
    const combobox = useCombobox();
    const [value, setValue] = useState('');
    const dispatch = useTypedDispatch();

    const cityMapping: Record<string, number> = {
        'Все города': 0,
        'Москва': 1,
        'Санкт-Петербург': 2,
    };

    const handleCitySelect = (cityName: string) => {
        setValue(cityName);
        combobox.closeDropdown();
        
        const cityId = cityName === 'Все города' ? '' : String(cityMapping[cityName]);

        dispatch(setSearchParams({ 
            area: cityId,
        }));
    };


    return (
        <Flex w={317} h={84} bg={'white'} bdrs={'12px'} align={'center'} justify={'center'}>
            <Combobox 
                store={combobox}
                onOptionSubmit={handleCitySelect}
            >
                <Combobox.Target>
                    <PillsInput w={269} h={36}
                        rightSection={<Combobox.Chevron />}
                        leftSection={<IconMapPin size={16} stroke={1.3} />} 
                        classNames={{ input: style['input-focus']}}
                    >
                        <PillsInput.Field
                            placeholder="Все города"
                            value={value}
                            onClick={() => combobox.toggleDropdown()}
                            onChange={(e) => setValue(e.currentTarget.value)}

                            readOnly
                        />

                    </PillsInput>
                </Combobox.Target>

                <Combobox.Dropdown className={style.combobox}>
                    <Combobox.Options>
                        <Combobox.Option value="Все города">Все города</Combobox.Option>
                        <Combobox.Option value="Москва">Москва</Combobox.Option>
                        <Combobox.Option value="Санкт-Петербург">Санкт-Петербург</Combobox.Option>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </Flex>
    );
}
