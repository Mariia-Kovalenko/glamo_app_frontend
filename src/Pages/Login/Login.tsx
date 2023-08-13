import { useFormik } from "formik";
import Input from "../../common/Input/Input";
import { loginValidationSchema } from "../../schemas/validationSchema";
import Button from "../../common/Button/Button";

export default function Login() {
    const { values, errors, touched, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: login,
    });

    function login() {
        console.log("login");
    }

    return (
        <div className="auth">
            <div className="auth__inner">
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
                    <button>Forgot password?</button>
                </div>

                <Button text="Log in" onClick={() => {}} fullWidth />
                <Button
                    text="continue as guest"
                    color="light"
                    onClick={() => {}}
                    fullWidth
                />

                <div className="redirect">
                    <p className="redirect__text">Do not have an account?</p>
                    <button className="redirect__btn">Sign Up</button>
                </div>
            </div>
        </div>
    );
}
