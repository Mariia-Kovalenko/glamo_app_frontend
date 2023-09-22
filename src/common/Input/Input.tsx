import { useState } from "react";
import "./Input.scss";

interface IInputProps {
    name: string;
    type: string;
    label: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    placeholder?: string;
    fullWidth?: boolean;
    onBlur?: any;
}

export default function Input({
    name,
    type,
    label,
    error,
    placeholder,
    value,
    fullWidth,
    onChange,
    onBlur,
}: IInputProps) {
    const [inputType, setInputType] = useState(type);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    let inputClass = "input ";
    inputClass += fullWidth && "fullWidth ";
    inputClass += error && "error-input ";

    const toggleShowPassword = () => {
        setIsPasswordVisible((prev) => !prev);
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
    };
    return (
        <div className="input-container">
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="input__inner">
                <input
                    name={name}
                    type={inputType}
                    className={inputClass}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {type === "password" && (
                    <button
                        className="toggle-show-password"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleShowPassword();
                        }}
                    >
                        {!isPasswordVisible ? (
                            <img src="./show-pass.svg" alt="show" />
                        ) : (
                            <img src="./hide-pass.svg" alt="hide" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
