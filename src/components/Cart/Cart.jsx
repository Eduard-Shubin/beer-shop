import React from 'react'
import {
    Box,
    Heading,
    VStack,
    Text,
    Button,
    Image,
    IconButton,
    ButtonGroup,
    Icon,
    HStack,
    Spacer,
} from '@chakra-ui/react'
import { MdOutlineClear, MdAdd, MdRemove } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useCart } from '../../context/CartContext'
import QuantityInput from '../QuantityInput/QuantityInput'
import CheckoutStepper from '../Stepper/CheckoutStepper'

const Cart = () => {
    const { cart, removeFromCart, increaseQty, decreaseQty } = useCart()

    const getTotalPrice = () => {
        return cart
            ? cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0.0)
            : 0
    }

    return (
        <Box maxWidth="800px" margin="auto" padding={4}>
            <Heading
                size="xl"
                marginBottom={6}
                display="flex"
                justifyContent="center"
            >
                <CheckoutStepper step={0} />
            </Heading>

            {cart.length === 0 ? (
                <Text fontSize="xl" textAlign="center">
                    Your cart is empty.
                </Text>
            ) : (
                <VStack spacing={6} align="stretch" justifyContent="center">
                    <Box>
                        <Box>
                            {cart.map((item) => (
                                <HStack
                                    key={item.id}
                                    alignItems="center"
                                    mb={4}
                                >
                                    <Box
                                        bg="gray.100"
                                        w={{
                                            base: '100%',
                                            md: '40rem',
                                            xl: '60rem',
                                        }}
                                        border={1}
                                        p={[2, 4, 6]}
                                    >
                                        <HStack spacing={4}>
                                            <Link
                                                to={`http://localhost:5173/product/${item.id}`}
                                            >
                                                <Image
                                                    src={item.image_url}
                                                    objectFit="contain"
                                                    alt={item.name}
                                                    boxSize="100px"
                                                    display={{
                                                        base: 'none',
                                                        md: 'block',
                                                    }}
                                                />
                                            </Link>
                                            <Box>
                                                <Link
                                                    to={`http://localhost:5173/product/${item.id}`}
                                                >
                                                    <Text
                                                        fontWeight="bold"
                                                        mb={2}
                                                        w={{
                                                            base: '4rem',
                                                            md: '20rem',
                                                            xl: '20rem',
                                                        }}
                                                        noOfLines={[2, 2, 3]}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </Link>
                                            </Box>
                                            <HStack alignItems="center" mb={2}>
                                                <ButtonGroup
                                                    size="xs"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <Button
                                                        bg="gray.300"
                                                        isDisabled={
                                                            item.qty <= 1
                                                        }
                                                        onClick={() =>
                                                            decreaseQty(item.id)
                                                        }
                                                    >
                                                        <Icon as={MdRemove} />
                                                    </Button>
                                                    <QuantityInput
                                                        id={item.id}
                                                        qty={item.qty}
                                                    />
                                                    <Button
                                                        bg="gray.300"
                                                        onClick={() =>
                                                            increaseQty(item.id)
                                                        }
                                                    >
                                                        <Icon as={MdAdd} />
                                                    </Button>
                                                </ButtonGroup>
                                            </HStack>
                                            <Spacer />
                                            <Box>
                                                <VStack
                                                    spacing={1}
                                                    alignItems="flex-end"
                                                >
                                                    <Text fontSize="sm" mb={2}>
                                                        {`Price: ${item.price}$`}
                                                    </Text>
                                                    <Text
                                                        fontSize="sm"
                                                        mb={2}
                                                        as="b"
                                                    >
                                                        {`Total:
                                                    ${item.price * item.qty}$`}
                                                    </Text>
                                                </VStack>
                                            </Box>
                                        </HStack>
                                    </Box>
                                    <IconButton
                                        icon={<MdOutlineClear />}
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Remove ${item.name} from cart`}
                                        size="lg"
                                        variant="ghost"
                                        colorScheme="gray"
                                    />
                                </HStack>
                            ))}
                        </Box>
                    </Box>

                    <Text fontSize="xl" fontWeight="bold" textAlign="right">
                        {`Total: ${getTotalPrice()}$`}
                    </Text>

                    <Button
                        as={Link}
                        to="/checkout"
                        colorScheme="teal"
                        size="lg"
                    >
                        Proceed to Checkout
                    </Button>
                </VStack>
            )}
        </Box>
    )
}

export default Cart
