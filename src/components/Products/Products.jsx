import { useState, useEffect } from 'react'
import { SimpleGrid, Skeleton, Box } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

import Product from '../Product/Product'
import fakeApi from '../../../fakeapi/fakeapi'
import Pagination from '../Pagination/Pagination'

const Products = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const totalPages = 10

    useEffect(() => {
        fakeApi
            .getBeers()
            .then((data) => {
                setProducts(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <>
            <SimpleGrid
                minChildWidth="300px"
                spacingX="40px"
                spacingY="40px"
                p={3}
            >
                {isLoading ? (
                    <Skeleton isLoaded={!isLoading} h="100vh" w="100%" />
                ) : (
                    products.map((product) => (
                        <Product product={product} key={uuidv4()} />
                    ))
                )}
            </SimpleGrid>
            <Box display="flex" justifyContent="center" mb={4}>
                <Pagination totalPages={totalPages} />
            </Box>
        </>
    )
}

export default Products
