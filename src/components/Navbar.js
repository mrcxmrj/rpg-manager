import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const Navbar = () => {
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    const links = [
        // /campaigns should be a route to a component containing global list of all campaigns
        { title: "campaigns", path: "/campaigns" },
        // /profile should be a route to a profile details/update profile component
        { title: "profile", path: "/" },
    ];

    const renderLinks = (links) => {
        return (
            <ol>
                {links.map((link) => (
                    <li key={link.title}>
                        {<Link to={link.path}>{link.title}</Link>}
                    </li>
                ))}
            </ol>
        );
    };

    const handleLogout = async () => {
        try {
            await logout();
            history.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>RPG Manager</h1>
            {currentUser && (
                <div>
                    {renderLinks(links)}
                    <button onClick={handleLogout}>log out</button>
                </div>
            )}
        </div>
    );
};
