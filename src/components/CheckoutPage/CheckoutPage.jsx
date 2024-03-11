import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

import CheckoutStepper from '../Stepper/CheckoutStepper'

const CheckoutPage = () => {
    return (
        <VStack spacing={4} padding={4}>
            <CheckoutStepper step={1} />
            <FormControl id="name">
                <FormLabel>Имя</FormLabel>
                <Input type="text" />
            </FormControl>

            <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
            </FormControl>

            <FormControl id="address">
                <FormLabel>Адрес</FormLabel>
                <Input type="text" />
            </FormControl>

            <Button colorScheme="blue" type="submit">
                Оформить заказ
            </Button>
        </VStack>
    )
}

export default CheckoutPage
