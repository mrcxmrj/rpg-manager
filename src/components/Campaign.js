import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export const Campaign = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        players: [{ username: "player1", uid: "asdf" }, "player2"],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = db
            .collection("campaigns")
            .doc(id)
            .onSnapshot((doc) => {
                console.log("fetching campaign data...");
                setData((currentData) => ({ ...currentData, ...doc.data() }));
                setLoading(false);
            });

        return unsubscribe;
    }, [id]);

    console.log(data);

    // requests, pending requests, although maybe that should be in the gm panel section

    return (
        !loading && (
            <div>
                <h1>{data.name}</h1>
                <ul>
                    <li>gm: {data.gm}</li>
                    <li>gmUid: {data.gmUid}</li>
                    <li>description: {data.description || ""}</li>
                    <li>system: {data.system || ""}</li>
                    <li>
                        players:
                        <ol>
                            {data.players.map((player) => (
                                <li>{player}</li>
                            ))}
                        </ol>
                    </li>
                </ul>
            </div>
        )
    );
};
