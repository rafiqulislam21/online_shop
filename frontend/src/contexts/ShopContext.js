import React, { useState, createContext } from 'react';


export const ShopContext = createContext();

export const ShopProvider = (props) => {
    const [products, setProducts] = useState([])

    return (
        <ShopContext.Provider value={[products, setProducts]}>
            {props.children}
        </ShopContext.Provider>
    );
}
