import { Badge, Tooltip } from '@chakra-ui/react'

const BadgeWithTooltip = ({ colorScheme, label, children }) => {
    return (
        <Tooltip hasArrow label={label}>
            <Badge borderRadius="full" px="2" colorScheme={colorScheme} mx="3">
                {children}
            </Badge>
        </Tooltip>
    )
}

export default BadgeWithTooltip
