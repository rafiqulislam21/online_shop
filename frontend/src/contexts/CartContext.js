import React, {useState, createContext} from 'react';


export const CartContext = createContext();

export const CartProvider = (props) =>{
    const [products, setProducts] = useState([
        // {   
        //     id: 1,
        //     name: "iPhone 13 pro max",
        //     description: "Brand new iPhone",
        //     price: 1300,
        //     is_active: true,
        //     created_date: new Date().toLocaleString(),
        //     rating: 5,
        //     category: {
        //         id: 11,
        //         name: "Electronics",
        //         description: "popular category",
        //     }
        // },
        // {   
        //     id: 2,
        //     name: "iPhone 13",
        //     description: "Brand new iPhone",
        //     price: 999,
        //     is_active: true,
        //     created_date: new Date().toLocaleString(),
        //     rating: 4.5,
        //     category: {
        //         id: 22,
        //         name: "Electronics",
        //         description: "popular category",
        //     }
        // },
        // {   
        //     id: 3,
        //     name: "iPhone 12 pro max",
        //     description: "Brand new iPhone",
        //     price: 900,
        //     is_active: true,
        //     created_date: new Date().toLocaleString(),
        //     rating: 4,
        //     category: {
        //         id: 33,
        //         name: "Electronics",
        //         description: "popular category",
        //     }
        // },
        // {   
        //     id: 4,
        //     name: "iPhone 11",
        //     description: "Brand new iPhone",
        //     price: 800,
        //     is_active: true,
        //     created_date: new Date().toLocaleString(),
        //     rating: 3,
        //     category: {
        //         id: 44,
        //         name: "Electronics",
        //         description: "popular category",
        //     }
        // }
    ])

    return(
        <CartContext.Provider value={[products, setProducts]}>
            {props.children}
        </CartContext.Provider>
    );
}
