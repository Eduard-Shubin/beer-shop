import { useState, useEffect } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import axios from 'axios'
import Product from '../Product/Product'

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios
            .get('https://api.punkapi.com/v2/beers', {
                params: {
                    page: '1',
                    per_page: '20',
                },
            })
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log(products)

    return (
        <>
            <SimpleGrid
                minChildWidth="300px"
                spacingX="40px"
                spacingY="40px"
                p={3}
            >
                {products.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default Products
