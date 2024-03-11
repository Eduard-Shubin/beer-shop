import { v4 as uuidv4 } from 'uuid'
import { memo, useState, useEffect } from 'react'
import {
    Text,
    Image,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Button,
    ButtonGroup,
    Divider,
    Badge,
    Center,
    Tooltip,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { motion } from 'framer-motion'

const Product = memo(function Product({ product }) {
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [price, setPrice] = useState(null)

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`)
    }

    useEffect(() => {
        if (price === null) {
            setPrice(calculateRandomPrice(product.volume.value))
        }
    }, [price, product.volume.value])

    product = { ...product, price: price }

    return (
        <>
            <Card key={uuidv4()} maxW="sm" boxShadow="lg">
                <CardBody
                    onClick={() => handleProductClick(product)}
                    _hover={{ cursor: 'pointer' }}
                >
                    <Center>
                        <Image
                            boxSize="200px"
                            objectFit="contain"
                            src={product.image_url}
                            alt={product.name}
                            mb={2}
                        ></Image>
                    </Center>
                    <Tooltip hasArrow label="Volume">
                        <Badge borderRadius="full" px="3" colorScheme="yellow">
                            {`${product.volume.value} l`}
                        </Badge>
                    </Tooltip>
                    <Tooltip hasArrow label="Alcohol">
                        <Badge
                            borderRadius="full"
                            px="2"
                            colorScheme="red"
                            mx="3"
                        >
                            {`${product.abv} %`}
                        </Badge>
                    </Tooltip>
                    <Tooltip hasArrow label="IBU">
                        <Badge borderRadius="full" px="2" colorScheme="orange">
                            {`${product.ibu} IBU`}
                        </Badge>
                    </Tooltip>
                    <Stack mt="3" spacing="3">
                        <Heading fontSize="xl" as="b" mb={2}>
                            {product.name}
                        </Heading>
                        <Tooltip label={product.description}>
                            <Text fontSize="md" noOfLines={3}>
                                {product.description}
                            </Text>
                        </Tooltip>
                        <Text color="blue.600" fontSize="2xl">
                            {`${product.price}$`}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing="2">
                        <Button variant="solid" colorScheme="blue">
                            Buy now
                        </Button>

                        <Button
                            as={motion.div}
                            variant="ghost"
                            colorScheme="blue"
                            whileTap={{ scale: 1.1 }}
                            onClick={() => {
                                addToCart(product)
                            }}
                            _hover={{ cursor: 'pointer' }}
                        >
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    )
})

function calculateRandomPrice(liters) {
    const randomMultiplier = Math.round(Math.random() * 4 + 1) + Math.random()

    const totalPrice = randomMultiplier * liters

    const roundedTotalPrice = Math.floor(totalPrice)

    return roundedTotalPrice
}

export default Product
