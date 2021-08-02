import React, { useState } from "react";
import { useForm } from "./useForm";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email address is required";
        }

        return errors;
    };

    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // takes key:value object (values) and uses signup on email and password
    const handleResetPassword = async (values) => {
        // processes error code from firebase (for example email already in use)
        const processErrorCode = (error) => {
            setErrors((errors) => ({
                ...errors,
                email: error.message,
            }));
        };

        try {
            setIsLoading(true);
            console.log(values.email);
            await resetPassword(values.email);
            setMessage("Verification email has been sent");
        } catch (error) {
            processErrorCode(error);
        }
        setIsLoading(false);
    };

    const { values, errors, setErrors, handleChange, handleSubmit } = useForm(
        handleResetPassword,
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
                    {message && <div className="form-success">{message}</div>}
                </div>

                <button type="submit" disabled={isLoading}>
                    Reset Password
                </button>
                <Link to="/login">Log In</Link>
            </form>
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};
