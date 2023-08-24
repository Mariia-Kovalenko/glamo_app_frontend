import "./Chip.scss";

type ChipProps = {
    text: string;
    onClick: () => void;
    color?: "light" | "dark";
    icon?: "delete" | "add";
};

export default function Chip({ text, onClick, color, icon }: ChipProps) {
    const chipClass = `chip ${color}`;
    return (
        <div className={chipClass}>
            <div className="chip__text">{text}</div>
            {icon === "delete" && (
                <button className="chip__btn">
                    <img src="/cross-white.svg" alt="cross" />
                </button>
            )}
            {icon === "add" && (
                <button className="chip__btn">
                    <img src="/add-white.svg" alt="cross" />
                </button>
            )}
        </div>
    );
}
