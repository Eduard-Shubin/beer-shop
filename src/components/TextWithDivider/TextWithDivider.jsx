import { Flex, Box, Text } from '@chakra-ui/react'

const TextWithDivider = ({ name, value }) => {
    return (
        <Flex>
            <Text>{name}</Text>
            <Box
                flex="1"
                height="1px"
                bg="gray.200"
                alignSelf="flex-end"
                transform={'translateY(-5px)'}
                mx={1}
            />
            {name === 'SRM' ? value : <Text>{value}</Text>}
        </Flex>
    )
}

export default TextWithDivider
