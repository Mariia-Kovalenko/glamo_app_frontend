import { useMemo, useState } from "react";
import MapFilters from "./MapFilters/MapFilters";
import "./Map.scss";
import MapGoogle from "./MapGoogle/MapGoogle";

type DirectionsResult = google.maps.DirectionsResult;

export default function Map() {
    const [center, setCenter] = useState({ lat: 38, lng: 43 });
    const [userLocation, setUserLocation] = useState({
        lat: 50.4226558,
        lng: 30.3810942,
    });
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);

    const handleUserLocation = (position: any) => {
        console.log(position);
        setUserLocation(position);
        setCenter(position);
    };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked((prev) => !prev);
    };

    const options = useMemo(
        () => ({
            mapId: "6d1d08f0d0fcf525",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    return (
        <div className="container">
            <div className="map">
                <MapFilters
                    handleUserLocation={handleUserLocation}
                    isCheckboxChecked={isCheckboxChecked}
                    setIsCheckboxChecked={setIsCheckboxChecked}
                    handleCheckboxChange={handleCheckboxChange}
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
