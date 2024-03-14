import {
    SimpleGrid,
    Box,
    Button,
    VStack,
    Heading,
    Text,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'

import CheckoutForm from '../CheckoutForm/CheckoutForm'
import CheckoutStepper from '../Stepper/CheckoutStepper'
import CheckoutCreditCard from '../CheckoutCreditCard/CheckoutCreditCard'
import { useCart } from '../../context/CartContext'
import { v4 as uuidv4 } from 'uuid'

import fakeApi from '../../../fakeapi/fakeapi'

const CheckoutPage = () => {
    const { cart, getTotalPrice, clearCart } = useCart()
    const navigate = useNavigate()
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        zipCode: '',
        cardNumber: '',
        cardHolderName: '',
        expirationDate: '',
        cvv: '',
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        address: Yup.string().required('Required'),
        zipCode: Yup.string().required('Required'),
        cardNumber: Yup.string()
            .matches(/^[0-9]{16}$/, 'Card number must be a 16-digit number')
            .required('Card number is required'),
        cardHolderName: Yup.string()
            .matches(
                /^[A-Za-z\s]+$/,
                'Cardholder name must contain only letters and spaces'
            )
            .required('Cardholder name is required'),
        expirationDate: Yup.string()
            .matches(
                /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                'Expiration date must be in the format MM/YY'
            )
            .required('Expiration date is required'),
        cvv: Yup.string()
            .matches(/^[0-9]{3,4}$/, 'CVV must be a 3 or 4-digit number')
            .required('CVV is required'),
    })

    const onSubmit = (values, actions) => {
        values.cart = cart
        fakeApi
            .makePayment(values)
            .then((payment) => {
                console.log(payment)
                actions.resetForm()
                actions.setSubmitting(false)
                clearCart()
                navigate('/completed')
            })
            .catch((error) => console.log(error))
    }
    return (
        <Box align="center">
            <Box display="flex" justifyContent="center" my={10}>
                <CheckoutStepper step={1} />
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Box>
                        <Form>
                            <SimpleGrid
                                columns={2}
                                templateColumns="60% 25%"
                                spacing={2}
                                w="90%"
                            >
                                <Box display="flex" justifyContent="center">
                                    <CheckoutForm formik={formik} />
                                </Box>
                                <Box
                                    display="flex"
                                    bg="gray.200"
                                    borderRadius="md"
                                    boxShadow="md"
                                >
                                    <VStack align="flex-start" px={5}>
                                        <Box mb={2}>
                                            <VStack align="flex-start">
                                                <Heading
                                                    as="h1"
                                                    size="lg"
                                                    my={5}
                                                >
                                                    Your order
                                                </Heading>
                                                <VStack
                                                    align="flex-start"
                                                    spacing={1}
                                                >
                                                    {cart.map((item) => {
                                                        return (
                                                            <Text
                                                                key={uuidv4()}
                                                                fontSize="sm"
                                                            >
                                                                {`${item.name} x${item.qty}`}
                                                            </Text>
                                                        )
                                                    })}
                                                </VStack>
                                            </VStack>
                                        </Box>
                                        <Text>Total</Text>
                                        <Text
                                            as="b"
                                            mb={2}
                                        >{`${getTotalPrice()}$`}</Text>
                                        <CheckoutCreditCard formik={formik} />
                                        <Button
                                            type="submit"
                                            disabled={formik.isSubmitting}
                                            my={4}
                                            colorScheme="teal"
                                            w="100%"
                                            isLoading={formik.isSubmitting}
                                        >
                                            Place Order
                                        </Button>
                                    </VStack>
                                </Box>
                            </SimpleGrid>
                        </Form>
                    </Box>
                )}
            </Formik>
        </Box>
    )
}

export default CheckoutPage
