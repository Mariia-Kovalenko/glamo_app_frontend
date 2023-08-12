import { useState } from "react";
import Checkbox from "../../../common/Checkbox/Checkbox";
import Places from "./Places/Places";
import "./MapFilters.scss";
import { servicesList } from "../../../mocks/mocks";
import Category from "./Category/Category";
import RangeSlider from "../../../common/RangeSlider/RangeSlider";
import Button from "../../../common/Button/Button";

export default function MapFilters({
    handleUserLocation,
    isCheckboxChecked,
    setIsCheckboxChecked,
    handleCheckboxChange
}: {
    handleUserLocation: (position: any) => void;
    isCheckboxChecked: boolean;
    setIsCheckboxChecked: (val: boolean) => void;
    handleCheckboxChange: () => void;
}) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchRadius, setSearchRadius] = useState(15);

    const handleSelectCategory = (id: string) => {
        setSelectedCategory(id);
    };

    const clearFilters = () => {
        setSearchRadius(15);
        setSelectedCategory('');
        setIsCheckboxChecked(true);
    }

    return (
        <div className="map__filters filters">
            <div className="filters__section">
                <h5 className="filters__title">Location</h5>
                <Places
                    setUserLocation={handleUserLocation}
                    isCheckboxChecked={isCheckboxChecked}
                    setIsCheckboxChecked={handleCheckboxChange}
                />
                <Checkbox
                    checked={isCheckboxChecked}
                    labelText="Use my current location"
                    value={"curr"}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className="filters__section">
                <h5 className="filters__title">Category</h5>
                <div className="filters__categories">
                    {servicesList.map((service) => {
                        return (
                            <Category
                                key={service._id}
                                id={service.typeId}
                                name={service.name}
                                isSelected={selectedCategory === service.typeId}
                                selectCategory={handleSelectCategory}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="filters__section">
                <h5 className="filters__title">Radius (km)</h5>
                <RangeSlider
                    min={0}
                    max={30}
                    step={5}
                    setValue={setSearchRadius}
                />
            </div>

            <div className="filters__section buttons">
                <Button
                    color="light"
                    text={"clear all"}
                    onClick={clearFilters}
                    fullWidth={true}
                />
                <Button text={"search"} onClick={() => {}} fullWidth={true} />
            </div>
        </div>
    );
}
