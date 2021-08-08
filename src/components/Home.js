import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { CampaignList } from "./CampaignList";

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
            <h1>Welcome to RPG Notes Manager {currentUser.displayName}!</h1>
            {error}
            <h2>Your Profile:</h2>
            <ul>
                <li>username: {currentUser.displayName}</li>
                <li>user ID: {currentUser.uid}</li>
                <li>email: {currentUser.email}</li>
                <li>photo: {currentUser.photoURL}</li>
            </ul>
            <CampaignList />
            <Link to="/add-campaign">Add a new campaign</Link>
            <br />
            <br />
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};
