import { useState, useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import { useCart } from '../../context/CartContext'

const QuantityInput = ({ id, qty }) => {
    const [itemQty, setItemQty] = useState(qty)

    const { changeQty } = useCart()

    useEffect(() => {
        setItemQty(qty)
    }, [qty])

    const handleInputChange = (e) => {
        setItemQty(e.target.value)
    }

    const handleBlur = (newQty) => {
        // Проверка, что новое значение является числом и больше или равно 1
        const parsedQty = parseInt(newQty)
        if (isNaN(parsedQty) || parsedQty < 1) {
            return
        }
        // Вызов функции changeQty из контекста для обновления количества продукта в корзине
        changeQty(id, parsedQty)
    }

    return (
        <Input
            size="sm"
            w={4}
            textAlign="center"
            variant="unstyled"
            type="number"
            value={itemQty}
            onBlur={(e) => handleBlur(e.target.value)}
            onChange={(e) => handleInputChange(e)}
        />
    )
}

export default QuantityInput
