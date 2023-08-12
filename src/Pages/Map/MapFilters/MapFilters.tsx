import { useState } from "react";
import Checkbox from "../../../common/Checkbox/Checkbox";
import Places from "./Places/Places";
import "./MapFilters.scss";
import { servicesList } from "../../../mocks/mocks";
import Category from "./Category/Category";

export default function MapFilters({
    handleUserLocation,
}: {
    handleUserLocation: (position: any) => void;
}) {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCheckboxChange = () => {
        setIsCheckboxChecked((prev) => !prev);
    };

    const handleSelectCategory = (id: string) => {
        setSelectedCategory(id);
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
        </div>
    );
}
