import React, { useState } from "react";
import { useForm } from "../useForm";
import { useAuth } from "../../contexts/authContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase";

export const Signup = () => {
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email address is required";
        }
        if (!values.username) {
            errors.username = "Username is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Cofirm password";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
        }

        return errors;
    };

    const { signup } = useAuth();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    // takes key:value object (values) and uses signup on email and password
    const handleSignup = async (values) => {
        //processes error code from firebase (for example email already in use)
        const processErrorCode = (error) => {
            if (error.code === "auth/weak-password") {
                setErrors((errors) => ({
                    ...errors,
                    password: error.message,
                }));
            } else {
                setErrors((errors) => ({
                    ...errors,
                    email: error.message,
                }));
            }
        };

        try {
            setIsLoading(true);

            // check if user with provided username exists in usernames collection
            const doc = await db
                .collection("usernames")
                .doc(values.username)
                .get();
            if (doc.exists) {
                setErrors((errors) => ({
                    ...errors,
                    username: "Username already in use",
                }));
                setIsLoading(false);
                return;
            }

            console.log("singing up...");
            const cred = await signup(values.email, values.password);

            const signUpDbUsername = db
                .collection("usernames")
                .doc(values.username)
                .set({
                    uid: cred.user.uid,
                });
            const signUpDbUser = db
                .collection("users")
                .doc(cred.user.uid)
                .set({
                    username: values.username,
                    email: values.email,
                    photo: values.username.charAt(0),
                });

            await Promise.all([signUpDbUser, signUpDbUsername]);
            history.push("/");
        } catch (error) {
            processErrorCode(error);
            setIsLoading(false);
        }
    };

    const { values, errors, setErrors, handleChange, handleSubmit } = useForm(
        handleSignup,
        validate
    );

    return (
        <div>
            <form action="submit" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        value={values.username || ""}
                        required
                    />
                    {errors.username && (
                        <div className="form-error">{errors.username}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={values.email || ""}
                        required
                    />
                    {errors.email && (
                        <div className="form-error">{errors.email}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password || ""}
                        required
                    />
                    {errors.password && (
                        <div className="form-error">{errors.password}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword || ""}
                        required
                    />
                    {errors.confirmPassword && (
                        <div className="form-error">
                            {errors.confirmPassword}
                        </div>
                    )}
                </div>
                <button type="submit" disabled={isLoading}>
                    Sign up
                </button>
            </form>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    );
};
