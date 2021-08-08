import React, { useState } from "react";
import { useForm } from "./useForm";
import { useAuth } from "../contexts/authContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";

export const AddCampaign = () => {
    const validate = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }

        return errors;
    };

    const { currentUser } = useAuth();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    // takes key:value object (values) and uses signup on email and password
    const addCampaign = async (values) => {
        try {
            setIsLoading(true);
            const newCampaignRef = db.collection("campaigns").doc();
            const updateCampaigns = newCampaignRef.set({
                name: values.name,
                system: values.system || "",
                description: values.description || "",
                gm: currentUser.displayName,
                gmUid: currentUser.uid,
            });
            // creates new record in campaigns map of type title:campaignId
            const updateUsers = db
                .collection("users")
                .doc(currentUser.uid)
                .update({
                    //campaigns: { [values.name]: newCampaignRef },
                    [`campaigns.${values.name}`]: newCampaignRef.id,
                });
            await Promise.all([updateCampaigns, updateUsers]);
            history.push("/");
        } catch (error) {
            setErrors((errors) => ({
                ...errors,
                general: error.message,
            }));
            setIsLoading(false);
        }
    };

    const { values, errors, setErrors, handleChange, handleSubmit } = useForm(
        addCampaign,
        validate
    );

    return (
        <div>
            <form action="submit" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Campaign name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={values.name || ""}
                        required
                    />
                    {errors.name && (
                        <div className="form-error">{errors.name}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="system">System</label>
                    <input
                        type="text"
                        name="system"
                        id="system"
                        onChange={handleChange}
                        value={values.system || ""}
                        required
                    />
                    {errors.system && (
                        <div className="form-error">{errors.system}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        value={values.description || ""}
                        required
                    />
                    {errors.description && (
                        <div className="form-error">{errors.description}</div>
                    )}
                </div>
                {errors.general && (
                    <div className="form-error">{errors.general}</div>
                )}
                <button type="submit" disabled={isLoading}>
                    Add
                </button>
            </form>
            <div>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
};
