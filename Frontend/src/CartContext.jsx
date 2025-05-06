// Frontend/src/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart từ localStorage khi component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item._id === product._id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += product.quantity || 1;
                console.log('Cập nhật số lượng sản phẩm trong giỏ:', updatedItems);
                return updatedItems;
            } else {
                const newCart = [...prevItems, { ...product, quantity: product.quantity || 1 }];
                console.log('Thêm mới vào giỏ:', newCart);
                return newCart;
            }
        });
    };


    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook để sử dụng cart context
export const useCart = () => {
    return useContext(CartContext);
};
