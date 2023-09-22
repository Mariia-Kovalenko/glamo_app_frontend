import "./Chip.scss";

type ChipProps = {
    text: string;
    onClick: () => void;
    color?: "light" | "dark";
    icon?: "delete" | "add";
};

export default function Chip({ text, onClick, color, icon }: ChipProps) {
    const chipClass = `chip ${color}`;

    const onButtonClick = (e: any) => {
        e.preventDefault();

        onClick();
    }

    // const onChipAdd = (e: any) => {
    //     e.preventDefault();
    //     onAdd();
    // }
    return (
        <div className={chipClass}>
            <div className="chip__text">{text}</div>
            {icon === "delete" && (
                <button className="chip__btn" onClick={onButtonClick}>
                    <img src="/cross-white.svg" alt="cross" />
                </button>
            )}
            {icon === "add" && (
                <button className="chip__btn" onClick={onButtonClick}>
                    <img src="/add-white.svg" alt="cross" />
                </button>
            )}
        </div>
    );
}
