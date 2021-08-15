import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase";
import { CampaignList } from "./CampaignList";
import { InvitesList } from "./InvitesList";

// this component probably should be renamed at some point to ProfileHome or something
// because there should be a landing page for not signed in users
export const Profile = () => {
    const { currentUser, userData } = useAuth();
    const [error, setError] = useState("");
    //const history = useHistory();
    //const [loading, setLoading] = useState(true);

    /* useEffect(() => {
        console.log("fetching users...");
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.uid)
            .onSnapshot((doc) => {
                setUserData(doc.data());
                setLoading(false);
                console.log("fetched");
            });

        return unsubscribe;
    }, [currentUser.uid]); */

    console.log("profile has user data:", userData);
    return (
        <div>
            <h1>Welcome to RPG Notes Manager, {userData.username}!</h1>
            {error}
            <h2>Your Profile:</h2>
            <ul>
                <li>username: {userData.username}</li>
                <li>user ID: {currentUser.uid}</li>
                <li>email: {userData.email}</li>
                <li>photo: {userData.photo}</li>
            </ul>
            <CampaignList campaigns={userData.campaigns} />
            <InvitesList pendingInvites={userData.pendingInvites} />
            {/*  <br />
                <br />
                <button onClick={handleLogout}>Log Out</button> */}
        </div>
    );
};
