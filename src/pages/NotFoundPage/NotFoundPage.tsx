import { Flex, Text, Button, Image } from '@mantine/core'
import cat from '../../assets/img/sad-cat 1.jpg'

export default function NotFoundPage () {
    return (
        <Flex w={707} h={556} m={'0 auto'} bg={'white'} mt={80} 
            direction={'column'} p={32}>
            <Flex direction={'column'}>
                <Flex justify={'space-between'} align={'flex-end'} >
                    <Text size={'34px'} fw={700} lh={1.3} w={'60%'}>Упс! Такой страницы не существует</Text>
                    <Button w={135} mb={8} bg={'#4263EB'} fw={400}>На главную</Button>
                    
                </Flex>
                <Text mt={12} mb={24}>Давайте перейдём к началу.</Text>
                
            </Flex>
            

            <Image 
                src={cat}
            />
        </Flex>
    )
}