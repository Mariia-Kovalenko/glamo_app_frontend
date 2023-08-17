import { Role } from "../../services/apiService";
import "./ToggleButton.scss";

interface IToggleButtonProps {
    label: string;
    toggled: boolean;
    setValue: (value: any) => void;
    side?: "left" | "right";
}

export default function ToggleButton({
    label,
    toggled,
    setValue,
    side,
}: IToggleButtonProps) {
    const handleToggled = () => {
        console.log("click", label);
        setValue(label.toUpperCase());
    };
    return (
        <button
            className={`toggle ${side || ""} ${toggled ? "active" : ""}`}
            onClick={(event) => {
                event.preventDefault();
                handleToggled();
            }}
        >
            {label}
        </button>
    );
}
