import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase";

export const CampaignList = () => {
    // campaigns is an object of campaignTitle:campaignId pairs
    const [campaigns, setCampaigns] = useState({});
    const [campaignInvites, setCampaignInvites] = useState([]);
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
                if (doc.data().pendingInvites) {
                    setCampaignInvites(doc.data().pendingInvites);
                }
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

    const renderCampaignInvites = (invites) => {
        return (
            <ol>
                {invites.map((invite) => (
                    <li key={invite.campaignId}>
                        {`${invite.gm} invites you to participate in "${
                            invite.name
                        }" campaign! | ${invite.date.toDate()}`}
                        {/* here should be buttons to accept/decline invitation*/}
                    </li>
                ))}
            </ol>
        );
    };

    //console.log(campaignInvites);
    return (
        !loading && (
            <div>
                <h2>Your campaigns:</h2>
                {renderCampaignTitles(campaigns)}
                <Link to="/add-campaign">Add a new campaign</Link>
                {/* {campaigns.map((campaign) => (
                    <li>{campaign}</li>
                ))} */}
                <h2>Pending campaign invites:</h2>
                {renderCampaignInvites(campaignInvites)}
            </div>
        )
    );
};
