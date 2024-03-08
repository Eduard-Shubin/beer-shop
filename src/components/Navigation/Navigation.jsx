import React from 'react'
import { Box, Icon, Spacer } from '@chakra-ui/react'
import { MdHome } from 'react-icons/md'

import NavLink from '../NavLink/NavLink'
import CartPopover from '../CartPopover/CartPopover'

const Navigation = () => {
    return (
        <Box
            bgGradient="linear(to-r, cyan.100, green.100)"
            display="flex"
            m={0}
            p={4}
            position="sticky"
            top={0}
            zIndex={1}
        >
            <NavLink to="/">
                <Icon as={MdHome} boxSize={6} />
            </NavLink>
            <Spacer />
            <CartPopover />
        </Box>
    )
}

export default Navigation
