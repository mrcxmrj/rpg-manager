import { useState } from "react";

export const useForm = (callback, validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentErrors = validate(values);

        if (Object.keys(currentErrors).length === 0) {
            callback(values);
            setValues({});
        } else {
            setErrors(currentErrors);
        }
    };

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    return { handleSubmit, handleChange, values, errors, setErrors };
};
