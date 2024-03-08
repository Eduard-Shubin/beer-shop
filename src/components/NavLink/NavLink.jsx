import { Link, Container } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const NavLink = ({ children, to }) => {
    return (
        <Container maxW="max" px={0}>
            <Link as={RouterLink} to={to} color="teal.500">
                {children}
            </Link>
        </Container>
    )
}

export default NavLink
