import React, { useState } from "react";
import { arrayUnion, db } from "../firebase";
import { useForm } from "./useForm";

export const GmPanel = (props) => {
    const validate = (values) => {
        let errors = {};
        if (!values.uid) {
            errors.uid = "Player ID is required";
        }

        return errors;
    };

    const invite = async (values) => {
        try {
            setLoading(true);
            const cred = db.collection("users").doc(values.uid);

            cred.get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    cred.update({
                        pendingInvites: arrayUnion({
                            name: props.data.name,
                            gm: props.data.gm,
                            date: new Date(),
                            campaignId: props.campaignId,
                        }),
                    });
                } else {
                    setErrors((errors) => ({
                        ...errors,
                        uid: "No player with provided id",
                    }));
                }
            });
        } catch (error) {
            setErrors((errors) => ({
                ...errors,
                uid: error.message,
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
            <label htmlFor="uid">Invite new player</label>
            <input
                type="text"
                name="uid"
                id="uid"
                onChange={handleChange}
                value={values.uid || ""}
                required
                placeholder="player ID"
            />
            <button type="submit" disabled={loading}>
                Invite
            </button>
            {errors.uid && <div className="form-error">{errors.uid}</div>}
        </form>
    );
};
