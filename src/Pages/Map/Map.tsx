import { useState } from "react";
import MapFilters from "./MapFilters/MapFilters";
import "./Map.scss";
import MapGoogle from "./MapGoogle/MapGoogle";
import SearchResults from "./SearchResults/SearchResults";
import { masters } from "../../mocks/mocks";
import { useSelector } from "react-redux";
import { IUserState } from "../../store/user/userSlice";
import { UsersService } from "../../services/apiService";
import Loader from "../../common/Loader/Loader";

export type MasterData = {
    id: string;
    location: Location;
    name?: string;
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
    const [mastersLocations, setMastersLocations] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showOnMap, setShowOnMap] = useState(null);

    const user = useSelector((state: { user: IUserState }) => state.user);

    const handleUserLocation = (position: any) => {
        setUserLocation(position);
        setCenter(position);
    };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked((prev) => !prev);
    };

    const handleFetchDirection = (id: string) => {
        console.log('id:',id);
        const masterToShow = mastersLocations.find((master: any) => master.id === id);
        console.log(masterToShow);
        setShowOnMap(masterToShow);
    }

    function fetchMasters() {
        setIsLoading(true);
        UsersService.getMasters(user.token, userLocation, searchRadius, [selectedCategory])
			.then((res) => {
                setIsLoading(false);
                setMastersList(res.data);

				const locations = res.data.map((master: any) => {
					if (master.location) {
						const coords = master.location.coordinates;
						return {
							id: master._id,
							location: { lat: coords[1], lng: coords[0] },
                            name: master.username
						};
					}
				});
				setMastersLocations(locations);
			})
			.catch((error) => {
				console.log(error);
			});
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
                    applyFilter={fetchMasters}
                />

                <div className="map__google-map">
                    <MapGoogle
                        isCheckboxChecked={isCheckboxChecked}
                        center={center}
                        userLocation={userLocation}
                        setCenter={setCenter}
                        setUserLocation={setUserLocation}
                        masters={mastersLocations}
                        showOnMap={showOnMap}
                    />
                </div>
                <div className="map__search-results">
                    <SearchResults
                        isLoading={isLoading}
                        masters={mastersList}
                        handleFetchDirection={handleFetchDirection}
                    />
                </div>
            </div>
        </div>
    );
}
