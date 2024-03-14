import { Field } from 'formik'
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
    HStack,
    Box,
} from '@chakra-ui/react'

const CheckoutCreditCard = ({ formik }) => {
    return (
        <Box display="flex">
            <VStack spacing={4}>
                <Field name="cardNumber">
                    {({ field, form }) => (
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.cardNumber &&
                                formik.touched.cardNumber
                            }
                        >
                            <FormLabel htmlFor="cardNumber">
                                Card Number
                            </FormLabel>
                            <Input
                                {...field}
                                type="number"
                                inputMode="numeric"
                                pattern="\d{16}"
                                title="Please enter a valid 16-digit credit card number"
                                maxLength={16}
                                bg="white"
                                id="cardNumber"
                                variant="flushed"
                                placeholder="Your Card Number"
                                pl={2}
                            />
                            <FormErrorMessage>
                                {form.errors.cardNumber}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field name="cardHolderName">
                    {({ field, form }) => (
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.cardHolderName &&
                                formik.touched.cardHolderName
                            }
                        >
                            <FormLabel htmlFor="cardHolderName">
                                Cardholder Name
                            </FormLabel>
                            <Input
                                {...field}
                                bg="white"
                                id="cardHolderName"
                                variant="flushed"
                                placeholder="Name on the Card"
                                title="Name on the Card"
                                pl={2}
                            />
                            <FormErrorMessage>
                                {form.errors.cardHolderName}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <HStack justifyContent="space-between" spacing={10} w="100%">
                    <Field name="expirationDate">
                        {({ field, form }) => (
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.expirationDate &&
                                    formik.touched.expirationDate
                                }
                            >
                                <FormLabel htmlFor="expirationDate">
                                    Expiration Date
                                </FormLabel>
                                <Input
                                    {...field}
                                    type="text"
                                    bg="white"
                                    id="expirationDate"
                                    variant="flushed"
                                    placeholder="MM/YY"
                                    pl={2}
                                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                    title="Enter a valid expiration date in the format MM/YY"
                                />
                                <FormErrorMessage>
                                    {form.errors.expirationDate}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Field name="cvv">
                        {({ field, form }) => (
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.cvv && formik.touched.cvv
                                }
                            >
                                <FormLabel htmlFor="cvv">CVV</FormLabel>
                                <Input
                                    {...field}
                                    bg="white"
                                    type="number"
                                    id="cvv"
                                    variant="flushed"
                                    pattern="\d{3,4}"
                                    title="Enter a valid CVV (3 or 4 digits)"
                                    maxLength={4}
                                    inputMode="numeric"
                                    placeholder="CVV"
                                    pl={2}
                                />
                                <FormErrorMessage>
                                    {form.errors.cvv}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </HStack>
            </VStack>
        </Box>
    )
}

export default CheckoutCreditCard
