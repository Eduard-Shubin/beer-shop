import { Field } from 'formik'
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage,
    HStack,
} from '@chakra-ui/react'

const CheckoutForm = ({ formik }) => {
    return (
        <Box mt={4}>
            <VStack spacing={4}>
                <HStack spacing={7}>
                    <Field name="firstName">
                        {({ field, form }) => (
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.firstName &&
                                    formik.touched.firstName
                                }
                            >
                                <FormLabel htmlFor="firstName">
                                    First Name
                                </FormLabel>
                                <Input
                                    {...field}
                                    id="firstName"
                                    variant="flushed"
                                    placeholder="Your First Name"
                                />

                                <FormErrorMessage>
                                    {form.errors.firstName}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="lastName">
                        {({ field, form }) => (
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.lastName &&
                                    formik.touched.lastName
                                }
                            >
                                <FormLabel htmlFor="lastName">
                                    Last Name
                                </FormLabel>
                                <Input
                                    {...field}
                                    id="lastName"
                                    variant="flushed"
                                    placeholder="Your Last Name"
                                />
                                <FormErrorMessage>
                                    {form.errors.lastName}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </HStack>
                <Field name="email">
                    {({ field, form }) => (
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.email && formik.touched.email
                            }
                        >
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Input
                                {...field}
                                id="email"
                                variant="flushed"
                                placeholder="youremail@example.com"
                            />
                            <FormErrorMessage>
                                {form.errors.email}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field name="address">
                    {({ field, form }) => (
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.address && formik.touched.address
                            }
                        >
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <Input
                                {...field}
                                id="address"
                                variant="flushed"
                                placeholder="City, Street, House Number, etc."
                            />
                            <FormErrorMessage>
                                {form.errors.address}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
                <Field name="zipCode">
                    {({ field, form }) => (
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.zipCode && formik.touched.zipCode
                            }
                        >
                            <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                            <Input
                                {...field}
                                id="zipCode"
                                variant="flushed"
                                placeholder="Your Zip Code"
                            />
                            <FormErrorMessage>
                                {form.errors.zipCode}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            </VStack>
        </Box>
    )
}

export default CheckoutForm
