import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

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
        });

        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.uid)
            .onSnapshot((doc) => {
                setUserData(doc.data());
                setLoading(false);
            });

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
            {!loading && children}
        </AuthContext.Provider>
    );
};
