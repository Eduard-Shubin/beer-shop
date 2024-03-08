import { memo } from 'react'
import { useEffect, useState } from 'react'
import {
    Image,
    Box,
    Stack,
    Heading,
    Text,
    Button,
    Spinner,
    Center,
    Container,
    SimpleGrid,
    Card,
    CardBody,
    VStack,
    Flex,
    useDisclosure,
} from '@chakra-ui/react'
import { lighten } from 'polished'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowBackIcon } from '@chakra-ui/icons'

import BadgeWithTooltip from '../BadgeWithTooltip/BadgeWithTooltip'
import ProductDetailsModal from '../ProductDetailsModal/ProductDetailsModal'
import { useCart } from '../../context/CartContext'

const ProductDetails = memo(function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { addToCart } = useCart()

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.punkapi.com/v2/beers/${id}`
                )
                setProduct({
                    ...response.data[0],
                    price: calculateRandomPrice(response.data[0].volume.value),
                })
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    // const handleBuyNow = (product) => {
    //     addToCart(product)
    // }

    return (
        <Flex justifyContent={'center'}>
            <Box p={4}>
                <Button
                    mb={4}
                    leftIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                >
                    Назад
                </Button>
                <Center>
                    <Container maxW="container.lg">
                        {loading ? (
                            <Center>
                                <Spinner size="xl" />
                            </Center>
                        ) : (
                            <SimpleGrid
                                columns={{ base: 1, md: 3 }}
                                spacing={10}
                                justifyItems={'center'}
                            >
                                <Box py={4} boxShadow={'md'} rounded={'md'}>
                                    <Image
                                        boxSize="500px"
                                        objectFit="contain"
                                        src={product.image_url}
                                        alt={product.name}
                                    />
                                </Box>
                                <Box>
                                    <Stack spacing={3}>
                                        <Heading fontSize="xl">
                                            {product.name}
                                        </Heading>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            justifyContent={'center'}
                                        >
                                            <BadgeWithTooltip
                                                label="Volume"
                                                colorScheme="yellow"
                                            >
                                                {`${product.volume.value} l`}
                                            </BadgeWithTooltip>
                                            <BadgeWithTooltip
                                                label="Alcohol"
                                                colorScheme="red"
                                            >
                                                {`${product.abv} %`}
                                            </BadgeWithTooltip>
                                            <BadgeWithTooltip
                                                label="IBU"
                                                colorScheme="orange"
                                            >
                                                {`${product.ibu} IBU`}
                                            </BadgeWithTooltip>
                                        </Stack>
                                        <Text
                                            onClick={onOpen}
                                            color="gray.600"
                                            textDecoration="underline"
                                            textDecorationStyle="dashed"
                                            textUnderlineOffset="0.3em"
                                            _hover={{
                                                cursor: 'pointer',
                                                color: lighten(0.2, '#4A5568'),
                                            }}
                                        >
                                            Все характеристики
                                        </Text>
                                        <ProductDetailsModal
                                            product={product}
                                            isOpen={isOpen}
                                            onClose={onClose}
                                        />
                                        <Text fontSize="lg">
                                            {product.description}
                                        </Text>
                                    </Stack>
                                </Box>
                                <Box>
                                    <Card w={'250px'} boxShadow={'lg'}>
                                        <CardBody>
                                            <Center>
                                                <Text
                                                    fontSize="5xl"
                                                    as="b"
                                                    color="blue.600"
                                                >
                                                    {`${product.price}$`}
                                                </Text>
                                            </Center>
                                            <VStack spacing={4}>
                                                <Button
                                                    w={200}
                                                    colorScheme="blue"
                                                    bg="blue.600"
                                                    onClick={() => {
                                                        addToCart(product)
                                                    }}
                                                    _hover={{
                                                        bg: lighten(
                                                            0.15,
                                                            '#2B6CB0'
                                                        ),
                                                    }}
                                                >
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    w={200}
                                                    colorScheme="blue"
                                                    bg="blue.100"
                                                    color="blue.500"
                                                    _hover={{ bg: 'blue.200' }}
                                                >
                                                    Buy Now
                                                </Button>
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                </Box>
                            </SimpleGrid>
                        )}
                    </Container>
                </Center>
            </Box>
        </Flex>
    )
})

// Функция для расчета случайной цены
function calculateRandomPrice(liters) {
    const randomMultiplier = Math.round(Math.random() * 4 + 1) + Math.random()
    const totalPrice = randomMultiplier * liters
    const roundedTotalPrice = Math.floor(totalPrice)
    return roundedTotalPrice
}

export default ProductDetails
