import {
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    useBreakpointValue,
} from '@chakra-ui/react'

const steps = [
    { title: 'Your Cart' },
    { title: 'Checkout Details' },
    { title: 'Order Complete' },
]

const CheckoutStepper = ({ step }) => {
    const orientation = useBreakpointValue({
        base: 'vertical',
        md: 'horizontal',
    })

    const { activeStep } = useSteps({
        index: step,
        count: steps.length,
    })

    return (
        <Stepper index={activeStep} orientation={orientation} w="80%">
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

export default CheckoutStepper
