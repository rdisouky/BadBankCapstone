import {useState, useEffect, useContext, createContext} from 'react';
import {auth} from './base';

export const AuthContext = createContext();

export const signOut = () => {
    auth.signOut();
};

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
   
    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    },[]);

    return (
        <AuthContext.Provider
            value={{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    );
};