import { useFormik } from "formik";
import Input from "../../common/Input/Input";
import {
    loginValidationSchema,
    registerValidationSchema,
} from "../../schemas/validationSchema";
import Button from "../../common/Button/Button";
import ToggleButton from "../../common/ToggleButton/ToggleButton";
import { useState } from "react";

export default function Registration() {
    const { values, errors, touched, handleChange, handleBlur } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: register,
    });
    const [role, setRole] = useState("CUSTOMER");

    function register() {
        console.log("register: ", role);
    }

    return (
        <div className="auth">
            <div className="auth__inner">
                <div className="auth__title">Sign Up</div>
                <div className="auth__role">
                    <ToggleButton
                        toggled={role === "CUSTOMER"}
                        setValue={setRole}
                        label={"customer"}
                        side='left'
                    />
                    <ToggleButton
                        toggled={role === "MASTER"}
                        setValue={setRole}
                        label={"master"}
                        side='right'
                    />
                </div>

                <Input
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <Button text="Sign Up" onClick={register} fullWidth />

                <div className="redirect">
                    <p className="redirect__text">Already have an account?</p>
                    <button className="redirect__btn">Log In</button>
                </div>
            </div>
        </div>
    );
}
