import React, { useState } from "react";
import { useForm } from "./useForm";
import { useAuth } from "../contexts/authContext";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email address is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const { login } = useAuth();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    // takes key:value object (values) and uses signup on email and password
    const handleLogin = (values) => {
        // processes error code from firebase (for example email already in use)
        const processErrorCode = (error) => {
            if (error.code === "auth/wrong-password") {
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

        setIsLoading(true);
        login(values.email, values.password)
            .then(() => history.push("/"))
            .catch((error) => {
                processErrorCode(error);
                setIsLoading(false);
            });
    };

    const { values, errors, setErrors, handleChange, handleSubmit } = useForm(
        handleLogin,
        validate
    );

    return (
        <div>
            <form action="submit" onSubmit={handleSubmit} noValidate>
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
                <button type="submit" disabled={isLoading}>
                    Log In
                </button>
            </form>
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};
