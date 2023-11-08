import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

import './Places.scss';
import { useEffect } from 'react';

type PlacesProps = {
	isCheckboxChecked: boolean;
	setIsCheckboxChecked: () => void;
	setUserLocation: (position: { lat: number; lng: number }) => void;
	inputStyle?: 'outlined' | 'filled';
	setUserAddress?: (address: string) => void,
	error?: boolean,
};

function Places({
	isCheckboxChecked,
	setIsCheckboxChecked,
	setUserLocation,
	inputStyle,
	setUserAddress,
	error
}: PlacesProps) {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();


	useEffect(() => {
		if (isCheckboxChecked) {
			setValue('', false);
		}
	}, [isCheckboxChecked, setValue]);

	let inputClass = inputStyle === 'outlined' ? 'combobox outlined' : 'combobox';
	inputClass += error ? " error-input " : '';

	const handleSelect = async (val: string) => {
		if (isCheckboxChecked) {
			setIsCheckboxChecked();
		}
		setValue(val, false);
		clearSuggestions();

		const results = await getGeocode({ address: val });
		// set address
		if (setUserAddress) {
			setUserAddress(val);
		}
		const { lat, lng } = getLatLng(results[0]);
		setUserLocation({ lat, lng });
	};

	const clearInput = () => {
		setValue('', false);
	};

	return (
		<Combobox onSelect={handleSelect}>
			<div className={inputClass}>
				<img src='/SearchOutlined.svg' alt='search' />
				<ComboboxInput
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={!ready}
					className='combobox-input'
					placeholder='Search address'
				/>
				{value && (
					<button className='clear-input' onClick={clearInput}>
						<img src='/Clear.svg' alt='clear' />
					</button>
				)}
			</div>
			<ComboboxPopover className='combobox-options'>
				<ComboboxList>
					{status === 'OK' &&
						data.map(
							({
								place_id,
								description,
							}: {
								place_id: string;
								description: string;
							}) => (
								<ComboboxOption
									className='combobox-option'
									key={place_id}
									value={description}
								/>
							)
						)}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
}

export default Places;
