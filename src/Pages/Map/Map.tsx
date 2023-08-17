import { useState } from "react";
import MapFilters from "./MapFilters/MapFilters";
import "./Map.scss";
import MapGoogle from "./MapGoogle/MapGoogle";
import SearchResults from "./SearchResults/SearchResults";
import { masters } from "../../mocks/mocks";

export type MasterData = {
    id: string;
    location: Location;
};

export type MasterInfoType = {
    id: string;
    email: string;
    username: string;
    address: string;
    role?: string;
    profileImage?: string;
};

export default function Map() {
    const [center, setCenter] = useState({ lat: 38, lng: 43 });
    const [userLocation, setUserLocation] = useState({
        lat: 50.4226558,
        lng: 30.3810942,
    });
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchRadius, setSearchRadius] = useState(5);
    const [mastersList, setMastersList] = useState<any>(null);

    const handleUserLocation = (position: any) => {
        setUserLocation(position);
        setCenter(position);
    };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked((prev) => !prev);
    };

    const applyFilter = () => {
        console.log(
            `location: ${userLocation.lng}, category: ${selectedCategory}, radius: ${searchRadius}`
        );
        const list = masters
            .map((master: any) => {
                if (master.location) {
                    const coords = master.location.coordinates;
                    return {
                        id: master._id,
                        location: { lat: coords[1], lng: coords[0] },
                    };
                }
                return null;
            })
            .filter((el) => el);
        console.log(list);
        setMastersList(list);
    };

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
                        masters={mastersList}
                    />
                </div>
                <div className="map__search-results">
                    <SearchResults
                        masters={mastersList
                        //     .map(
                        //     ({
                        //         _id,
                        //         email,
                        //         username,
                        //         address,
                        //         role,
                        //         services,
                        //     }: any) => {
                        //         return {
                        //             id: _id,
                        //             email,
                        //             username,
                        //             address,
                        //             role,
                        //             services,
                        //         };
                        //     }
                        // )
                    }
                    />
                </div>
            </div>
        </div>
    );
}
