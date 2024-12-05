import { useFormik } from "formik";
import Input from "../../common/Input/Input";
import { loginValidationSchema } from "../../schemas/validationSchema";
import Button from "../../common/Button/Button";
import { AuthService } from "../../services/apiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const { values, errors, handleChange } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: resetPass,
    });
    const [passwordSent, setPasswordSent] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    function resetPass() {
        setIsLoading(true);
        AuthService.resetPassword(values.email)
            .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    setPasswordSent(true);
                    setMessage(res.data.message);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response.status === 404) {
                    setError(true);
                    setMessage(error.response.data.message);
                }
            });
    }
    return (
        <div className="auth">
            {passwordSent ? (
                <div className="auth__inner">
                    <h5 className="auth__title">Link sent!</h5>
                    <p>{message}</p>

                    <Button
                        text="Back to authorisation"
                        onClick={() => navigate("/login")}
                        fullWidth
                    />
                </div>
            ) : (
                <form className="auth__inner">
                    <h5 className="auth__title">Reset Password</h5>
                    <p>A one-time link will be send to your email adress</p>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                    />

                    <Button
                        text={isLoading ? "Loading..." : "Reset Pasword"}
                        onClick={resetPass}
                        fullWidth
                    />

                    <div className="auth__error">{message}</div>
                </form>
            )}
        </div>
    );
}
