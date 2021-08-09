import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

    // currently storing displayName, photoUrl etc is not supported for user object
    // fetch from CampaignList component should be here storing current user data and passing it on as props
    return (
        <div>
            <h1>Welcome to RPG Notes Manager, {currentUser.displayName}!</h1>
            {error}
            <h2>Your Profile:</h2>
            <ul>
                <li>username: {currentUser.displayName}</li>
                <li>user ID: {currentUser.uid}</li>
                <li>email: {currentUser.email}</li>
                <li>photo: {currentUser.photoURL}</li>
            </ul>
            <CampaignList />
            <br />
            <br />
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};
