import React, {useState, createContext} from 'react';


export const ProductContext = createContext();

// single product provider
export const ProductProvider = (props) =>{
    const [product, setProduct] = useState(
        {   
            id: 1,
            name: "iPhone 13 pro max",
            description: "Brand new iPhone",
            price: 1300,
            is_active: true,
            created_date: new Date().toLocaleString(),
            rating: 4.0,
            category: {
                id: 11,
                name: "Electronics",
                description: "popular category",
            },
            reviews:[
                {
                    id: 111,
                    description: "product review description here",
                    rating: 4.0,
                    created_date: new Date().toLocaleString(),
                    user:{
                        id: 1,
                        first_name: "John",
                        last_name: "Smith",
                        email: "john@gmail.com",
                        phone_no: "123-456"
                    }
                },
                {
                    id: 112,
                    description: "product review description here",
                    rating: 2.0,
                    created_date: new Date().toLocaleString(),
                    user:{
                        id: 1,
                        first_name: "John",
                        last_name: "Smith",
                        email: "john@gmail.com",
                        phone_no: "123-456"
                    }
                },
                {
                    id: 113,
                    description: "product review description here",
                    rating: 5.0,
                    created_date: new Date().toLocaleString(),
                    user:{
                        id: 1,
                        first_name: "John",
                        last_name: "Smith",
                        email: "john@gmail.com",
                        phone_no: "123-456"
                    }
                }
            ]
        }
    )

    return(
        <ProductContext.Provider value={[product, setProduct]}>
            {props.children}
        </ProductContext.Provider>
    );
}