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

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        const newMaxVal = Math.max(value, minValue + step);
        setMaxValue(newMaxVal);
        setValue(newMaxVal);
    };

    return (
        <div className="range-slider-wrapper">
           
            <div className="range-slider-labels">
                {labelOptions.map((option, i) => (
                    <span
                        key={i}
                        className={`label-option ${option <= maxValue ? "active" : ""}`}
                        style={{ left: `${((option - min) / (max - min)) * 100}%` }}
                    >
                        {option}
                    </span>
                ))}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={maxValue}
                step={step}
                onChange={handleMaxChange}
                className="range-slider"
            />
        </div>
    );
}
