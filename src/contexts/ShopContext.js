import React, {useEffect, useState} from "react";
import {fetchProducts} from "../api/products";
import useBasket from "../hooks/useBasket";

const defaultValue = {
    products: [],
    basket: [],
    addProduct: () => { return 0; },
    removeProduct: () => { return 0; },
    total: Number
};

export const ShopContext = React.createContext(defaultValue);

export const ShopContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const { basket, setBasket, addProduct, removeProduct, total, setTotal } = useBasket();

    const providerValue = {
        products,
        basket,
        addProduct,
        removeProduct,
        total
    };

    useEffect(() => {
        fetchProducts()
            .then((p) => {
                setProducts(p);
                setBasket([]);
                setTotal(0);
            })
    }, []);

    return (
        <ShopContext.Provider value={providerValue}>{children}</ShopContext.Provider>
    );
}

export default ShopContext;
