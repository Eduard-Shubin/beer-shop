import { Box, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Order from '../../assets/v5.gif'

const CompletedOrder = () => {
    const navigate = useNavigate()
    return (
        <Box
            display="flex"
            width="100%"
            h="100vh"
            justifyContent="center"
            alignItems="center"
            p={5}
            bg="#f2f2f2"
        >
            <Image
                src={Order}
                _hover={{ cursor: 'pointer' }}
                alt="Back to main page"
                onClick={() => navigate('/')}
            />
        </Box>
    )
}

export default CompletedOrder
