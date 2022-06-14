import React, { useState, createContext } from 'react';


export const UserContext = createContext();

// single User provider
export const UserProvider = (props) => {
    const [loggedUser, setLoggedUser] = useState(
        // {
        //     id: 1,
        //     first_name: "John",
        //     last_name: "Smith",
        //     email: "john@gmail.com",
        //     phone_no: "123-456"
        // }
    )

    return(
        <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            {props.children}
        </UserContext.Provider>
    );
}