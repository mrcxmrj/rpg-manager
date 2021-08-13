import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase";
import { CampaignList } from "./CampaignList";
import { InvitesList } from "./InvitesList";

export const Home = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("fetching...");
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.uid)
            .onSnapshot((doc) => {
                setUserData(doc.data());
                /* setUser((currentCampaigns) => {
                    let newObj = {
                        ...currentCampaigns,
                        ...doc.data().campaigns,
                    };
                    return newObj;
                });
                if (doc.data().pendingInvites) {
                    setCampaignInvites(doc.data().pendingInvites);
                } */
                setLoading(false);
                console.log("fetched");
            });

        return unsubscribe;
    }, [currentUser.uid]);

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
        !loading && (
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
                <br />
                <br />
                <button onClick={handleLogout}>Log Out</button>
            </div>
        )
    );
};
