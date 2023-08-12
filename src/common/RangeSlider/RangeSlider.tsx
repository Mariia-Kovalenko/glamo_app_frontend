import { useState } from "react";
import "./RangeSlider.scss";

interface IRangeSliderProps {
    step: number;
    min: number;
    max: number;
    setValue: (val: number) => void;
}

export default function RangeSlider({
    step,
    min,
    max,
    setValue,
}: IRangeSliderProps) {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(min + step);
    const labelOptions = [];

    for (let i = min; i <= max; i += step) {
        labelOptions.push(i);
    }
    const handleMaxChange = (event: any) => {
        event.preventDefault();
        const value = parseFloat(event.target.value);
        // the new max value is the value from the event.
        // it must not be less than the current min value!
        const newMaxVal = Math.max(value, minValue + step);
        setMaxValue(newMaxVal);
        setValue(newMaxVal);
    };
    return (
        <div className="range-slider-wrapper">
            <datalist>
                {labelOptions.map((option, i) => (
                    <option key={i} value={option} label={`${option}`}></option>
                ))}
            </datalist>
            <input
                type="range"
                min={min}
                max={max}
                value={maxValue}
                step={step}
                onChange={handleMaxChange}
            />
        </div>
    );
}
