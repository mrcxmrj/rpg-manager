import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase";
import { Campaign } from "./Campaign";

export const CampaignList = () => {
    // campaigns is an object of campaignTitle:campaignRef pairs
    const [campaigns, setCampaigns] = useState({});
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.uid)
            .onSnapshot((doc) => {
                setCampaigns((currentCampaigns) => {
                    let newObj = {
                        ...currentCampaigns,
                        ...doc.data().campaigns,
                    };
                    return newObj;
                });
                setLoading(false);
            });

        return unsubscribe;
    }, [currentUser.uid]);

    const renderCampaignTitles = (campaigns) => {
        let result = [];
        for (let key in campaigns) {
            result.push(
                <li key={campaigns[key]}>
                    <Link to={`/campaigns/${campaigns[key]}`}>{key}</Link>
                </li>
            );
        }
        return <ul>{result}</ul>;
    };

    console.log(campaigns);
    return (
        <div>
            <h2>Your campaigns:</h2>
            {!loading && renderCampaignTitles(campaigns)}
            {/* {campaigns.map((campaign) => (
                    <li>{campaign}</li>
                ))} */}
        </div>
    );
};
