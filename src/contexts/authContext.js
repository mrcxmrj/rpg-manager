import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const signup = (email, password) => {
        console.log("signing up...");
        return auth.createUserWithEmailAndPassword(email, password);
    };
    const login = (email, password) => {
        console.log("logging in...");
        return auth
            .signInWithEmailAndPassword(email, password)
            .then(() => console.log("login succesful!"));
    };
    const logout = () => {
        console.log("logging out...");
        return auth.signOut();
    };
    const resetPassword = (email) => {
        console.log("sending reset email...");
        return auth.sendPasswordResetEmail(email);
    };

    useEffect(() => {
        console.log(currentUser);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        const unsubscribe = () => {
            if (currentUser.uid)
                return db
                    .collection("users")
                    .doc(currentUser.uid)
                    .onSnapshot((doc) => {
                        setUserData(doc.data());
                    });
        };

        return unsubscribe;
    }, [currentUser]);

    const value = {
        currentUser,
        userData,
        signup,
        login,
        logout,
        resetPassword,
    };
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
