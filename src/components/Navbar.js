import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import styles from "../css/navbar.module.css";

export const Navbar = () => {
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    const links = [
        // /campaigns should be a route to a component containing global list of all campaigns
        { title: "campaigns", path: "/campaigns" },
        // /profile should be a route to a profile details/update profile component
        { title: "profile", path: "/" },
    ];

    const renderLinks = (links, logoutBtn) => {
        return (
            <ul className={styles.links}>
                {links.map((link) => (
                    <li key={link.title}>
                        <Link to={link.path}>{link.title}</Link>
                    </li>
                ))}
                <li key="logout" onClick={handleLogout}>
                    log out
                </li>
            </ul>
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
        <div className={styles.navbar}>
            <h1>RPG Manager</h1>
            {currentUser && renderLinks(links)}
        </div>
    );
};
