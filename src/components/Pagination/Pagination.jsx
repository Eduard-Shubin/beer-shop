import { Box, Button, HStack } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

const Pagination = ({ totalPages }) => {
    const { pageNumber = 1 } = useParams()
    const pageNum = parseInt(pageNumber)
    const navigate = useNavigate()

    const handlePrevPage = () => {
        const prevPage = pageNum - 1
        navigate(`/products/${prevPage}`)
    }

    const handleNextPage = () => {
        const nextPage = pageNum + 1
        navigate(`/products/${nextPage}`)
    }

    return (
        <HStack spacing={4}>
            <Button onClick={handlePrevPage} isDisabled={pageNum === 1}>
                <MdNavigateBefore />
            </Button>
            <Box>
                Page {pageNum} of {totalPages}
            </Box>
            <Button
                onClick={handleNextPage}
                isDisabled={pageNum === totalPages}
            >
                <MdNavigateNext />
            </Button>
        </HStack>
    )
}

export default Pagination
