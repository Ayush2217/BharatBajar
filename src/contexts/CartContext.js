import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = localStorage.getItem("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });

    const [saveForLater, setSaveForLater] = useState(() => {
        const storedSaveForLater = localStorage.getItem("saveForLater");
        return storedSaveForLater ? JSON.parse(storedSaveForLater) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        localStorage.setItem("saveForLater", JSON.stringify(saveForLater));
    }, [cart, wishlist, saveForLater]);

    // Add to Cart or Update Quantity with Stock Validation
    const addToCart = (product) => {
        if (!product) return console.error("Cannot add undefined product to the cart.");
        if (product.stock <= 0) {
            alert(`${product.name} is out of stock.`);
            return;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                if (existingProduct.quantity >= product.stock) {
                    alert(`Insufficient stock for ${product.name}.`);
                    return prevCart;
                }
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Add to Wishlist
    const addToWishlist = (product) => {
		if (!product || !product.id) {
			console.error("Invalid product data. Ensure the product has a valid ID.");
			return;
		}

		setWishlist((prevWishlist) => {
			const exists = prevWishlist.some((item) => item.id === product.id);
			if (!exists) {
				const updatedWishlist = [...prevWishlist, product];
				localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
				console.log("Product added to wishlist:", product);
				return updatedWishlist;
			} else {
				console.warn("Product is already in the wishlist.");
				return prevWishlist;
			}
		});
	};


    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => {
            const updatedWishlist = prevWishlist.filter((item) => item.id !== productId);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };
    // Move to "Save for Later" and Remove from Cart
    const moveToSaveForLater = (product) => {
        if (product) {
            setSaveForLater((prevSaveForLater) => {
                const exists = prevSaveForLater.find((item) => item.id === product.id);
                if (!exists) {
                    localStorage.setItem(
                        "saveForLater",
                        JSON.stringify([...prevSaveForLater, { ...product, quantity: 1 }])
                    );
                    return [...prevSaveForLater, { ...product, quantity: 1 }];
                }
                return prevSaveForLater;
            });
            removeFromCart(product.id);
        }
    };

    // Remove from Cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Increment Quantity with Stock Validation
    const incrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? item.quantity < item.stock
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    : item
            )
        );
    };

    // Decrement Quantity
    const decrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Buy Now: Stores the product separately for immediate checkout without clearing the cart
    const buyNow = (product) => {
        if (product) {
            if (product.stock <= 0) {
                alert(`${product.name} is out of stock.`);
                return;
            }
            localStorage.setItem("buyNowProduct", JSON.stringify({ ...product, quantity: 1 }));
            console.log("Buy Now product stored:", product);
        } else {
            console.error("Cannot process undefined product for Buy Now.");
        }
    };

    // Retrieve Buy Now product
    const getBuyNowProduct = () => {
        const storedProduct = localStorage.getItem("buyNowProduct");
        return storedProduct ? JSON.parse(storedProduct) : null;
    };

    // Calculate Total Price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                wishlist,
                saveForLater,
                addToCart,
                addToWishlist,
                moveToSaveForLater,
                removeFromCart,
                incrementQuantity,
                decrementQuantity,
                buyNow,
                getBuyNowProduct,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
