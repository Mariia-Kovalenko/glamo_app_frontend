import './Button.scss';

interface ButtonProps {
	text: string;
	onClick: () => void;
    size?: 'small' | 'large';
    color?: 'dark' | 'light' | 'grey';
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset" | undefined
}

function Button({ text, onClick, size, color, fullWidth, type }: ButtonProps) {
	let buttonClass = 'btn ';

    buttonClass += size + ' ' || 'large ';
    buttonClass += color || 'dark ';
	buttonClass += fullWidth ? ' fullWidth': '';

	return (
		<button
			className={buttonClass}
			onClick={(event) => {
				event.preventDefault();
				onClick();
			}}
			type={type}
		>
			{text}
		</button>
	);
}

export default Button;