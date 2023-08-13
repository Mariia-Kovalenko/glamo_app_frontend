import './ToggleButton.scss';

interface IToggleButtonProps {
    label: string;
    toggled: boolean;
    setValue: (value: string) => void;
    side?: 'left' | 'right';
}

export default function ToggleButton({label, toggled, setValue, side} : IToggleButtonProps) {
    const handleToggled = () => {
        setValue(label.toUpperCase());
    }
    return (
        <button className={`toggle ${side || ''} ${toggled ? 'active' : ''}`} onClick={handleToggled}>
            {label}
        </button>
    )
}