import { useMemo, useState } from "react";
import MapFilters from "./MapFilters/MapFilters";
import "./Map.scss";

type DirectionsResult = google.maps.DirectionsResult;

export default function Map() {
    const [center, setCenter] = useState({ lat: 38, lng: 43 });
    const [userLocation, setUserLocation] = useState({
        lat: 50.4226558,
        lng: 30.3810942,
    });

    const handleUserLocation = (position: any) => {
        setUserLocation(position);
        setCenter(position);
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
                <MapFilters handleUserLocation={handleUserLocation} />

                <div className="map__google-map">map</div>
                <div className="map__search-results">search list</div>
            </div>
        </div>
    );
}
