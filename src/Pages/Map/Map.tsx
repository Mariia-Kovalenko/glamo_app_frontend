import { useState } from "react";
import MapFilters from "./MapFilters/MapFilters";
import "./Map.scss";
import MapGoogle from "./MapGoogle/MapGoogle";

export default function Map() {
    const [center, setCenter] = useState({ lat: 38, lng: 43 });
    const [userLocation, setUserLocation] = useState({
        lat: 50.4226558,
        lng: 30.3810942,
    });
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchRadius, setSearchRadius] = useState(5);

    const handleUserLocation = (position: any) => {
        setUserLocation(position);
        setCenter(position);
    };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked((prev) => !prev);
    };

    const applyFilter = () => {
        console.log(`location: ${userLocation.lng}, category: ${selectedCategory}, radius: ${searchRadius}`)
    }

    return (
        <div className="container">
            <div className="map">
                <MapFilters
                    handleUserLocation={handleUserLocation}
                    isCheckboxChecked={isCheckboxChecked}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSearchRadius={setSearchRadius}
                    setIsCheckboxChecked={setIsCheckboxChecked}
                    handleCheckboxChange={handleCheckboxChange}
                    applyFilter={applyFilter}
                />

                <div className="map__google-map">
                    <MapGoogle
                        isCheckboxChecked={isCheckboxChecked}
                        center={center}
                        userLocation={userLocation}
                        setCenter={setCenter}
                        setUserLocation={setUserLocation}
                    />
                </div>
                <div className="map__search-results">
                    <div
                        style={{
                            width: "270px",
                            height: "300px",
                            background: "#f2f2f2",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
