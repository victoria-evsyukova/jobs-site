import { Group, Text, Flex, Image, Indicator } from '@mantine/core';
import style from './Header.module.css';
import logo from '../../assets/img/image 2.svg';
import user from '../../assets/img/user-circle.svg'


export default function Header() {

  return (
      <header className={style['header']} data-testid="banner">
        <Flex align='center' w={'100%'} px={'md'} py={'sm'}>
            <Group gap={'10px'} w={'40%'}>
                <Image src={logo}
                    w={30}
                    h={30} 
                    className={style['cursor']}
                />
                <Text fw={600} size="lg" pt={'5px'} className={style['cursor']}>.FrontEnd</Text>
            </Group>

            <Flex justify={'center'} gap={'25px'}>
                <Group gap={'10px'}>
                    <Text fw={500} size='md' className={style['cursor']}> Вакансии FE </Text>
                    <Indicator  
                        size={8}
                        color={'#4263EB'} 
                       withBorder 
                        />
                </Group>
                

                <Group gap={'3px'}>
                    <Image 
                        src={user}
                        w={24}
                        h={24}
                    />
                    <Text fw={500} c={'#0F0F1080'} className={style['cursor']}>Обо мне</Text>
                </Group>
            </Flex>

        </Flex>
        
      </header>
    ) 
}