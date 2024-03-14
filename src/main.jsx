import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'

import Products from './components/Products/Products'
import Layout from './components/Layout/Layout'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'
import CheckoutPage from './components/CheckoutPage/CheckoutPage'
import CompletedOrder from './components/CompletedOrder/CompletedOrder'

import './index.css'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="/products/:pageNumber" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/completed" element={<CompletedOrder />} />
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </ChakraProvider>
    </React.StrictMode>
)
