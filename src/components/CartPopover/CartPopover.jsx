import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Icon,
    Box,
    Image,
    Text,
    HStack,
    Divider,
    PopoverFooter,
    Button,
    VStack,
    ButtonGroup,
    Badge,
    Spacer,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import {
    MdShoppingCart,
    MdDeleteForever,
    MdAdd,
    MdRemove,
} from 'react-icons/md'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'

import QuantityInput from '../QuantityInput/QuantityInput'

const CartPopover = () => {
    const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
        useCart()

    return (
        <Popover>
            <PopoverTrigger>
                <Box>
                    <Icon
                        as={MdShoppingCart}
                        boxSize={6}
                        _hover={{ cursor: 'pointer' }}
                    />
                    <Badge
                        position="absolute"
                        display="flex"
                        boxShadow="md"
                        alignItems="center"
                        justifyContent="center"
                        boxSize={4}
                        colorScheme="red"
                        top="7"
                        right="7"
                        borderRadius="50%"
                    >
                        {cart.length}
                    </Badge>
                </Box>
            </PopoverTrigger>

            <PopoverContent maxHeight="70vh" boxShadow="md">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody
                    maxHeight="70vh"
                    overflowY="auto"
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'grey',
                            borderRadius: '24px',
                        },
                    }}
                >
                    {cart.length > 0 ? (
                        <Box>
                            {cart.map((product, index) => {
                                return (
                                    <Box mb={3} key={uuidv4()}>
                                        <HStack spacing={2}>
                                            <Box w="100px">
                                                <Link
                                                    to={`http://localhost:5173/product/${product.id}`}
                                                    mb={3}
                                                >
                                                    <HStack justifyContent="center">
                                                        <Image
                                                            boxSize="100px"
                                                            objectFit="contain"
                                                            src={
                                                                product.image_url
                                                            }
                                                            alt={product.name}
                                                            alignSelf="center"
                                                        />
                                                    </HStack>
                                                </Link>
                                            </Box>
                                            <Box w="300px">
                                                <VStack alignItems="flex-start">
                                                    <Link
                                                        to={`http://localhost:5173/product/${product.id}`}
                                                        mb={3}
                                                    >
                                                        <Text>{`${product.name}`}</Text>
                                                    </Link>
                                                    <ButtonGroup
                                                        size="xs"
                                                        justifyContent="center"
                                                        gap={2}
                                                    >
                                                        <Button
                                                            isDisabled={
                                                                product.qty <= 1
                                                            }
                                                            onClick={() =>
                                                                decreaseQty(
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            <Icon
                                                                as={MdRemove}
                                                            />
                                                        </Button>
                                                        <QuantityInput
                                                            id={product.id}
                                                            qty={product.qty}
                                                        />
                                                        <Button
                                                            onClick={() =>
                                                                increaseQty(
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            <Icon as={MdAdd} />
                                                        </Button>
                                                    </ButtonGroup>
                                                </VStack>
                                            </Box>
                                            <Box w="50px">
                                                <Text as="b">{`${
                                                    product.price * product.qty
                                                }$`}</Text>
                                            </Box>
                                            <Box
                                                _hover={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    removeFromCart(product.id)
                                                }}
                                                w="50px"
                                            >
                                                <Icon
                                                    as={MdDeleteForever}
                                                    boxSize={6}
                                                />
                                            </Box>
                                        </HStack>
                                        {index + 1 < cart.length ? (
                                            <Box>
                                                <Divider mt={3} mb={3} />
                                            </Box>
                                        ) : null}
                                    </Box>
                                )
                            })}
                            <Button
                                onClick={clearCart}
                                w="100%"
                                variant="outline"
                                colorScheme="cyan"
                                borderRadius={3}
                            >
                                Clear Cart
                            </Button>
                        </Box>
                    ) : (
                        <Text>Cart is empty</Text>
                    )}
                </PopoverBody>
                {cart.length > 0 && (
                    <PopoverFooter
                        position="sticky"
                        bottom="0"
                        left="0"
                        right="0"
                        backgroundColor="white"
                    >
                        <HStack>
                            <Text fontSize="xl">Total</Text>
                            <Spacer />
                            <Text fontSize="xl">{`${
                                cart
                                    ? cart.reduce(
                                          (acc, curr) =>
                                              acc + curr.price * curr.qty,
                                          0.0
                                      )
                                    : 0
                            }$`}</Text>
                        </HStack>
                        <Button as={Link} to="/cart">
                            My Cart
                        </Button>
                    </PopoverFooter>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default CartPopover
