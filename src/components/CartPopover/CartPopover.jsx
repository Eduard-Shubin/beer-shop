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

const CartPopover = () => {
    const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
        useCart()

    console.log('cart', cart)

    return (
        <Popover overflowY="auto" maxW="70vh">
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
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />

                <PopoverBody>
                    {cart.length > 0 ? (
                        cart.map((product, index) => {
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
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        alignSelf="center"
                                                    />
                                                </HStack>
                                            </Link>
                                        </Box>
                                        <Box w="300px">
                                            <VStack>
                                                <Link
                                                    to={`http://localhost:5173/product/${product.id}`}
                                                    mb={3}
                                                >
                                                    <Text>{`${product.name} x${product.qty}`}</Text>
                                                </Link>
                                                <ButtonGroup>
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
                                                        <Icon as={MdRemove} />
                                                    </Button>
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
                                            <Text as="b">{`${product.price}$`}</Text>
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
                                        <Divider mt={3} mb={3} />
                                    ) : null}
                                </Box>
                            )
                        })
                    ) : (
                        <Text>Cart is empty</Text>
                    )}
                </PopoverBody>
                {cart.length > 0 && (
                    <PopoverFooter>
                        <HStack justifyContent="space-around" spacing={2}>
                            <Button onClick={clearCart}>Clear Cart</Button>
                            <Text textAlign="right" fontSize="xl">{`Total: ${
                                cart
                                    ? cart.reduce(
                                          (acc, curr) =>
                                              acc + curr.price * curr.qty,
                                          0.0
                                      )
                                    : 0
                            }$`}</Text>
                        </HStack>
                    </PopoverFooter>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default CartPopover
