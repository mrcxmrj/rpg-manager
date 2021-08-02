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
            welcome home
            {currentUser.email}
            <Link to="/update-profile">Update Profile</Link>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};
