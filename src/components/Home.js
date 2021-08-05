import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const Home = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    const handleLogout = async () => {
        setError("");

        try {
            await logout();
            history.push("login");
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div>
            <h3>Welcome to RPG Notes Manager {currentUser.displayName}!</h3>
            {error}
            <h5>Your Profile:</h5>
            <ul>
                <li>username: {currentUser.displayName}</li>
                <li>email: {currentUser.email}</li>
                <li>photo: {currentUser.photoURL}</li>
            </ul>
            <Link to="/add-campaign">Add a new campaign</Link>
            <br />
            <br />
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};
