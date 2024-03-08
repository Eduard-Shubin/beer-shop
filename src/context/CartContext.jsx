import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'))
        return storedCart || []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id)

        if (existingProduct) {
            const updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            )
            setCart(updatedCart)
        } else {
            setCart([...cart, { ...product, qty: 1 }])
        }
    }

    function increaseQty(id) {
        setCart((prevState) => {
            const updatedCart = prevState.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: item.qty + 1,
                    }
                }
                return item
            })
            return updatedCart
        })
    }

    function decreaseQty(id) {
        setCart((prevState) => {
            const updatedCart = prevState.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: item.qty - 1,
                    }
                }
                return item
            })
            return updatedCart
        })
    }

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQty,
                decreaseQty,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
