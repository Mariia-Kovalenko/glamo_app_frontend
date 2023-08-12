import './Checkbox.scss';

interface ICheckboxProps {
	checked: boolean;
	labelText: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ checked, labelText, value, onChange }: ICheckboxProps) {
	return (
		<div className='checkbox'>
			<input
				className='checkbox__input'
				type='checkbox'
				checked={checked}
				name='checkbox'
				value={value}
				onChange={onChange}
			/>
			<label className='checkbox__label' htmlFor='checkbox'>Use my current location</label>
		</div>
	);
}

export default Checkbox;
