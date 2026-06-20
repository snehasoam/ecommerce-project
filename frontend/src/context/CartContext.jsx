import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🛒 FETCH CART FROM BACKEND
    const fetchCart = async () => {
        if (!getAccessToken()) return;

        setLoading(true);
        setError(null);

        try {
            const res = await authFetch(`${BASEURL}/api/cart/`);
            const data = await res.json();

            setCartItems(data.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setError("Failed to load cart");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // ➕ ADD TO CART
    const addToCart = async (productId) => {
        try {
            await authFetch(`${BASEURL}/api/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product_id: productId }),
            });

            await fetchCart();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // ❌ REMOVE FROM CART
    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId }),
            });

            await fetchCart();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    // 🔢 UPDATE QUANTITY
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }

        try {
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: itemId,
                    quantity: quantity,
                }),
            });

            await fetchCart();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // 🧹 CLEAR CART (BACKEND SAFE VERSION)
    const clearCart = async () => {
        try {
            await authFetch(`${BASEURL}/api/cart/clear/`, {
                method: "POST",
            });

            setCartItems([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    // 💰 TOTAL PRICE (FRONTEND CALCULATION)
    const total = cartItems.reduce(
        (sum, item) => sum + (item.product_price || 0) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                total,
                loading,
                error,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// 🪝 SAFE HOOK
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};