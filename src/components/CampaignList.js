import React from "react";
import { Link } from "react-router-dom";

export const CampaignList = ({ campaigns }) => {
    // campaigns is an object of campaignTitle:campaignId pairs
    //const [campaigns, setCampaigns] = useState({});
    //const [campaignInvites, setCampaignInvites] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const { currentUser } = useAuth();

    /* useEffect(() => {
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
    }, [currentUser.uid]); */

    /* const renderCampaignTitles = (campaigns) => {
        let result = [];
        for (let key in campaigns) {
            result.push(
                <li key={campaigns[key]}>
                    <Link to={`/campaigns/${campaigns[key]}`}>{key}</Link>
                </li>
            );
        }
        return <ul>{result}</ul>;
    }; */

    // returns ul by iterating over campaigns keys
    // (campaigns is an object of key:value pairs storing campaigntitle:campaignId)
    const renderCampaignTitles = (campaigns) => (
        <ul>
            {Object.keys(campaigns).map((key) => (
                <li key={campaigns[key]}>
                    <Link to={`/campaigns/${campaigns[key]}`}>{key}</Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <h2>Your campaigns:</h2>
            {renderCampaignTitles(campaigns)}
            <Link to="/add-campaign">Add a new campaign</Link>
        </div>
    );
};
