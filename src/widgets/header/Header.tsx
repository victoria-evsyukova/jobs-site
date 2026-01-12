import { 
    Group, 
    Text, 
    Flex, 
    Image, 
    Indicator, 
    Button, 
    Badge,
    Avatar,
    Menu,
    ActionIcon,
    Paper
} from '@mantine/core';
import { 
    IconSearch, 
    IconBell, 
    IconSettings, 
    IconLogout, 
    IconUser,
    IconBriefcase,
    IconHome,
    IconChevronDown,
    IconMessageCircle,
    IconStar,
    IconSun,
    IconMoon
} from '@tabler/icons-react';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import logo from '../../assets/img/image 2.svg';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(3);

    const isVacanciesPage = location.pathname.includes('/vacancies/');
    const isAboutPage = location.pathname === '/about';

    const handleClickLogo = () => {
        navigate('/vacancies/all-cities');
    }

    const handleNotificationClick = () => {
        setNotifications(0);
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <Paper 
            className={style.header} 
            shadow="sm" 
            radius={0}
            withBorder
        >
            <div className={style.headerContainer}>
                {/* Логотип и навигация */}
                <Flex align='center' justify='space-between' w="100%">
                    {/* Логотип */}
                    <Group 
                        gap={'12px'} 
                        className={style.logoGroup}
                        onClick={handleClickLogo}
                    >
                        <div className={style.logoContainer}>
                            <Image 
                                src={logo}
                                w={36}
                                h={36} 
                                className={style.logoImage}
                            />
                            <div className={style.logoGlow}></div>
                        </div>
                        <div>
                            <Text fw={700} size={'24px'} className={style.logoText}>
                                .FrontEnd
                                <span className={style.logoDot}>.</span>
                            </Text>
                            <Text size="xs" c="dimmed" className={style.logoSubtitle}>
                                Job Platform
                            </Text>
                        </div>
                    </Group>

                    {/* Основная навигация */}
                    <Group gap={10} className={style.mainNav}>
                        <NavLink 
                            to='/vacancies/all-cities' 
                            className={({ isActive }) => 
                                `${style.navItem} ${isActive ? style.navItemActive : ''}`
                            }
                        >
                            <IconHome size={20} />
                            <Text fw={500}>Главная</Text>
                        </NavLink>

                        <NavLink 
                            to='/vacancies/moscow' 
                            className={({ isActive }) => 
                                `${style.navItem} ${style.navItemWithIndicator} ${isActive ? style.navItemActive : ''}`
                            }
                        >
                            <IconBriefcase size={20} />
                            <Text fw={500}>Вакансии FE</Text>
                            {isVacanciesPage && (
                                <Indicator 
                                    size={8} 
                                    color="#4263EB" 
                                    className={style.navIndicator}
                                    withBorder 
                                />
                            )}
                        </NavLink>

                        <NavLink 
                            to='/about' 
                            className={({ isActive }) => 
                                `${style.navItem} ${isActive ? style.navItemActive : ''}`
                            }
                        >
                            <IconUser size={20} />
                            <Text fw={500}>Обо мне</Text>
                            {isAboutPage && (
                                <Indicator 
                                    size={8} 
                                    color="#4263EB" 
                                    className={style.navIndicator}
                                    withBorder 
                                />
                            )}
                        </NavLink>
                    </Group>

                    {/* Правый блок: поиск и действия */}
                    <Group gap={20} className={style.actionsGroup}>
                        {/* Поиск */}
                        <div className={style.searchContainer}>
                            <IconSearch size={18} className={style.searchIcon} />
                            <input 
                                type="text" 
                                placeholder="Поиск вакансий..." 
                                className={style.searchInput}
                            />
                        </div>

                        {/* Тема */}
                        <ActionIcon 
                            variant="subtle" 
                            size="lg"
                            onClick={toggleDarkMode}
                            className={style.themeToggle}
                            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>

                        {/* Уведомления */}
                        <div className={style.notificationWrapper}>
                            <ActionIcon 
                                variant="subtle" 
                                size="lg"
                                onClick={handleNotificationClick}
                                className={style.notificationButton}
                            >
                                <IconBell size={20} />
                                {notifications > 0 && (
                                    <Badge 
                                        size="xs" 
                                        circle 
                                        className={style.notificationBadge}
                                    >
                                        {notifications}
                                    </Badge>
                                )}
                            </ActionIcon>
                        </div>

                        {/* Сообщения */}
                        <ActionIcon 
                            variant="subtle" 
                            size="lg"
                            className={style.messageButton}
                        >
                            <IconMessageCircle size={20} />
                            <Badge 
                                size="xs" 
                                color="red" 
                                variant="filled"
                                className={style.messageBadge}
                            >
                                2
                            </Badge>
                        </ActionIcon>

                        {/* Профиль пользователя */}
                        <Menu 
                            width={200} 
                            position="bottom-end" 
                            withArrow
                            shadow="md"
                        >
                            <Menu.Target>
                                <Group gap={8} className={style.profileMenuTrigger}>
                                    <Avatar 
                                        size={36} 
                                        radius="xl" 
                                        color="blue"
                                        className={style.avatar}
                                    >
                                        <IconUser size={20} />
                                    </Avatar>
                                    <IconChevronDown size={16} className={style.chevronIcon} />
                                </Group>
                            </Menu.Target>

                            <Menu.Dropdown className={style.profileDropdown}>
                                <Menu.Label>Аккаунт</Menu.Label>
                                <Menu.Item 
                                    leftSection={<IconUser size={16} />}
                                    className={style.menuItem}
                                >
                                    Мой профиль
                                </Menu.Item>
                                <Menu.Item 
                                    leftSection={<IconSettings size={16} />}
                                    className={style.menuItem}
                                >
                                    Настройки
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item 
                                    leftSection={<IconLogout size={16} />}
                                    color="red"
                                    className={style.menuItem}
                                >
                                    Выйти
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        {/* Кнопка "Разместить вакансию" */}
                        <Button 
                            variant="gradient" 
                            gradient={{ from: '#4263EB', to: '#7048E8' }}
                            radius="md"
                            size="sm"
                            className={style.postJobButton}
                            rightSection={<IconStar size={16} />}
                        >
                            Разместить вакансию
                        </Button>
                    </Group>
                </Flex>

                {/* Вторичная навигация (города/фильтры) */}
                {isVacanciesPage && (
                    <div className={style.secondaryNav}>
                        <Group gap={10}>
                            <Button 
                                variant="light" 
                                size="xs"
                                radius="xl"
                                className={style.cityButton}
                            >
                                Москва
                            </Button>
                            <Button 
                                variant="subtle" 
                                size="xs"
                                radius="xl"
                                className={style.cityButton}
                            >
                                Санкт-Петербург
                            </Button>
                            <Button 
                                variant="subtle" 
                                size="xs"
                                radius="xl"
                                className={style.cityButton}
                            >
                                Новосибирск
                            </Button>
                            <Button 
                                variant="subtle" 
                                size="xs"
                                radius="xl"
                                className={style.cityButton}
                            >
                                Екатеринбург
                            </Button>
                            <Button 
                                variant="subtle" 
                                size="xs"
                                radius="xl"
                                className={style.cityButton}
                            >
                                + Все города
                            </Button>
                        </Group>
                    </div>
                )}
            </div>
        </Paper>
    );
}