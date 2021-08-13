import React, { useState } from "react";
import { arrayUnion, db } from "../firebase";
import { useForm } from "./useForm";

export const GmPanel = (props) => {
    const validate = (values) => {
        let errors = {};
        if (!values.username) {
            errors.username = "Player username is required";
        }

        return errors;
    };

    const invite = async (values) => {
        try {
            setLoading(true);
            const query = db
                .collection("users")
                .where("username", "==", values.username)
                .limit(1);

            await query.get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    setErrors((errors) => ({
                        ...errors,
                        username: "No player with provided username",
                    }));
                } else {
                    console.log("sending invite");
                    const docRef = querySnapshot.docs[0].ref;
                    docRef.update({
                        pendingInvites: arrayUnion({
                            name: props.data.name,
                            gm: props.data.gm,
                            date: new Date(),
                            campaignId: props.campaignId,
                        }),
                    });
                }
            });
        } catch (error) {
            setErrors((errors) => ({
                ...errors,
                username: error.message,
            }));
        }
        setLoading(false);
    };

    const { values, errors, setErrors, handleSubmit, handleChange } = useForm(
        invite,
        validate
    );
    const [loading, setLoading] = useState(false);

    return (
        <form action="submit" onSubmit={handleSubmit} noValidate>
            <label htmlFor="username">Invite new player</label>
            <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                value={values.username || ""}
                required
                placeholder="player ID"
            />
            <button type="submit" disabled={loading}>
                Invite
            </button>
            {errors.username && (
                <div className="form-error">{errors.username}</div>
            )}
        </form>
    );
};
