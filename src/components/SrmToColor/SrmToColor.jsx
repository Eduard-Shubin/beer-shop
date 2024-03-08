import { Box, Tooltip } from '@chakra-ui/react'

const SrmToColor = ({ srmValue }) => {
    const colorHex = srmToColorHex(srmValue)

    return (
        <Tooltip hasArrow label={srmValue}>
            <Box
                w="40px"
                h="20px"
                bg={colorHex}
                border="1px solid black"
                borderRadius="md"
            />
        </Tooltip>
    )
}

function srmToColorHex(srmValue) {
    // Assume SRM range from 1 to 40+
    const colorMap = {
        1: '#FFFF99', // Pale Yellow
        2: '#E6C34D', // Straw
        6: '#FFD700', // Gold
        10: '#FFA500', // Amber
        14: '#B87333', // Copper
        20: '#8B4513', // Brown
        30: '#E62A00', // Black
    }

    let closestSrm = 1
    let minDifference = Math.abs(srmValue - closestSrm)

    for (const srm of Object.keys(colorMap)) {
        const difference = Math.abs(srmValue - srm)
        if (difference < minDifference) {
            closestSrm = srm
            minDifference = difference
        }
    }

    return colorMap[closestSrm]
}

export default SrmToColor
