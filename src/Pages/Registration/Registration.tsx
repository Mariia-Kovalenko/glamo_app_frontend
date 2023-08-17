import { useFormik } from "formik";
import Input from "../../common/Input/Input";
import {
    loginValidationSchema,
    registerValidationSchema,
} from "../../schemas/validationSchema";
import Button from "../../common/Button/Button";
import ToggleButton from "../../common/ToggleButton/ToggleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, Role } from "../../services/apiService";

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
    const [role, setRole] = useState(Role.CUSTOMER);

    const navigate = useNavigate();

    function register() {
		AuthService.register(values.username, values.email, values.password, role)
			.then((res) => {
				if (res.status === 201) {
					navigate('/login');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

    return (
        <div className="auth">
            <form className="auth__inner">
                <div className="auth__title">Sign Up</div>
                <div className="auth__role">
                    <ToggleButton
                        toggled={role === Role.CUSTOMER}
                        setValue={setRole}
                        label={"customer"}
                        side="left"
                    />
                    <ToggleButton
                        toggled={role === Role.MASTER}
                        setValue={setRole}
                        label={"master"}
                        side="right"
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

                <Button text="Sign Up" onClick={register} fullWidth type='submit' />

                <div className="redirect">
                    <p className="redirect__text">Already have an account?</p>
                    <button
                        className="redirect__btn"
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}
