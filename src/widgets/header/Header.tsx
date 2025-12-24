import { Group, Text, Flex, Image, Indicator } from '@mantine/core';
import style from './Header.module.css';
import logo from '../../assets/img/image 2.svg';
import user from '../../assets/img/user-circle.svg';
import userActive from '../../assets/img/Vector (2).svg';
import { NavLink, useNavigate } from 'react-router';


export default function Header() {
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate('/vacancies/all-cities')
    }


    return (
        <header className={style['header']} data-testid="banner">
            <Flex align='center' w={'100%'} px={'md'} py={'sm'}>
                <Group gap={'10px'} w={'40%'} onClick={handleClickLogo}>
                    <Image src={logo}
                        w={30}
                        h={30} 
                        className={style['cursor']}
                    />
                    <Text fw={600} size="lg" pt={'5px'} className={style['cursor']}>.FrontEnd</Text>
                </Group>

            <Flex justify={'center'} gap={'25px'}>
                <NavLink to='/vacancies/moscow' className={style.link}>
                    {({ isActive }) => (
                        <Group gap={'10px'}>
                            <Text td={'none'} fw={500} size='md' className={isActive ? style.active : style.link}>
                                Вакансии FE
                            </Text>
                            {isActive && (
                                <Indicator  
                                    size={8}
                                    color={'#4263EB'} 
                                    withBorder 
                                />
                            )}
                        </Group>
                    )}
                </NavLink>
                                

                <NavLink to='/about' className={style.link}>
                    {({ isActive }) => (
                        <Group gap={'3px'}>
                            <Image 
                                src={isActive ? userActive : user}
                                w={24}
                                h={24}
                                fit='contain'
                                className={isActive ? style.img : ''}
                            />
                            
                            <Text td={'none'} mr={7} fw={500} className={isActive ? style.active : style.link}>Обо мне</Text>
                            {isActive && (
                                <Indicator  
                                    size={8}
                                    color={'#4263EB'} 
                                    withBorder 
                                />
                            )}
                        </Group>
                    )}
                </NavLink>
                
            </Flex>

        </Flex>
        
      </header>
    ) 
}