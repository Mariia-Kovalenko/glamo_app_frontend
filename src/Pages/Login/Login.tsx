import { useFormik } from "formik";
import Input from "../../common/Input/Input";
import { loginValidationSchema } from "../../schemas/validationSchema";
import Button from "../../common/Button/Button";
import { IUserState, authorizeUser } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AuthService, Role } from "../../services/apiService";
import { useState } from "react";
import { LocalStorageService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { values, errors, touched, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: login,
    });
    const [requestError, setRequestError] = useState({
        error: false,
        message: "Error",
    });

    const user = useSelector((state: { user: IUserState }) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function login() {
        if (!values.email || !values.password) {
            setRequestError({ error: true, message: "Please fill the form" });
            return;
        }
        AuthService.login(values.email, values.password)
            .then((res) => {
                const { username, role, access_token, profileImage } = res.data;
                console.log(profileImage);
                dispatch(
                    authorizeUser(
                        true,
                        username,
                        role,
                        access_token,
                        profileImage
                    )
                );

                // save token to localStorage
                LocalStorageService.saveUserToLocal(access_token);

                navigate("/map");
            })
            .catch((error) => {
                if (error.response) {
                    setRequestError({
                        error: true,
                        message: error.response.data.message,
                    });
                } else {
                    setRequestError({
                        error: true,
                        message: error.message,
                    });
                }
            });
    }

    return (
        <div className="auth">
            <form className="auth__inner">
                <div className="auth__title">Log In</div>

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
                <div className="restore-pass">
                    <button onClick={() => navigate("/reset_pass")}>
                        Forgot password?
                    </button>
                </div>

                {requestError.error && (
                    <div className="error">{requestError.message}</div>
                )}

                <Button text="Log in" onClick={login} fullWidth type="submit" />
                <Button
                    text="continue as guest"
                    color="light"
                    onClick={() => {
                        navigate("/map");
                    }}
                    fullWidth
                />

                <div className="redirect">
                    <p className="redirect__text">Do not have an account?</p>
                    <button
                        className="redirect__btn"
                        onClick={() => navigate("/register")}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}
