import React from "react";
import { useForm } from "./useForm";

export const Signup = () => {
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email address is required";
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
    const signup = () => {
        alert(`User Created!
        Email: ${values.email}
        Password: ${values.password}`);
    };
    const { values, errors, handleChange, handleSubmit } = useForm(
        signup,
        validate
    );

    return (
        <form action="submit" onSubmit={handleSubmit}>
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
                    <div className="form-error">{errors.confirmPassword}</div>
                )}
            </div>

            <button type="submit">Sign up</button>
        </form>
    );
};
