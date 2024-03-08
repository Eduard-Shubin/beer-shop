import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useMediaQuery,
    Box,
    Text,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'

import { CheckIcon } from '@chakra-ui/icons'

import { v4 as uuidv4 } from 'uuid'

import TextWithDivider from '../TextWithDivider/TextWithDivider'
import SrmToColor from '../SrmToColor/SrmToColor'

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

    const modalProps = isLargerThan1280
        ? {
              maxW: '33%',
              h: '100vh',
              m: 0,
              borderRadius: 0,
              css: {
                  position: 'fixed',
                  right: 0,
              },
          }
        : {
              size: 'md',
              mx: 2,
          }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset={isLargerThan1280 ? 'slideInRight' : 'scale'}
        >
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
            <ModalContent {...modalProps}>
                <ModalHeader>{product.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextWithDivider
                        name="Alcohol by Volume"
                        value={product.abv}
                    />
                    <TextWithDivider
                        name="Volume"
                        value={`${product.volume.value} ${product.volume.unit}`}
                    />
                    <TextWithDivider
                        name="Boil Volume"
                        value={`${product.boil_volume.value} ${product.boil_volume.unit}`}
                    />
                    <TextWithDivider
                        name="European Brewery Convention"
                        value={product.ebc}
                    />
                    <TextWithDivider
                        name="International Bitterness Units"
                        value={product.ibu}
                    />
                    <TextWithDivider name="pH" value={product.ph} />
                    <TextWithDivider
                        name="First Brewed"
                        value={product.first_brewed}
                    />
                    <TextWithDivider
                        name="SRM"
                        value={<SrmToColor srmValue={product.srm} />}
                    />

                    <Box p={4} borderWidth="1px" borderRadius="md" mt={4}>
                        <Text fontSize="md" fontWeight="bold" mb={2}>
                            How it’s prepared:
                        </Text>

                        <Text fontSize="sm">
                            <Text
                                as="span"
                                fontSize="sm"
                                mt={4}
                                fontWeight="bold"
                            >
                                {`Fermentation temperature: `}
                            </Text>
                            {`${product.method.fermentation.temp.value} °C`}
                        </Text>

                        <Text fontSize="sm" mt={4} fontWeight="bold">
                            Malt:
                        </Text>
                        {product.ingredients.malt.map((ingredient) => (
                            <Text key={uuidv4()} fontSize="sm">
                                - {`${ingredient.name}: `}
                                {`${ingredient.amount.value} ${ingredient.amount.unit}`}
                            </Text>
                        ))}

                        <Text fontSize="sm" mt={4} fontWeight="bold">
                            Yeast:
                        </Text>
                        <Text fontSize="sm">{product.ingredients.yeast}</Text>
                    </Box>
                    <Box p={4} borderWidth="1px" borderRadius="md" mt={4}>
                        <Text fontSize="md" fontWeight="bold" mb={2}>
                            Best with:
                        </Text>
                        <List spacing={3}>
                            {product.food_pairing.map((food) => {
                                return (
                                    <ListItem key={uuidv4()}>
                                        <ListIcon
                                            as={CheckIcon}
                                            color="green.500"
                                        />
                                        {food}
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ProductDetailsModal
