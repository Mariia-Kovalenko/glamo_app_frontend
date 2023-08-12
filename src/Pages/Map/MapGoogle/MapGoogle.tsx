import "./MapGoogle.scss";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
} from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { LatLng } from "use-places-autocomplete";

type Location = {
    lat: number;
    lng: number;
};
type DirectionsResult = google.maps.DirectionsResult;

interface IMapGoogleProps {
    isCheckboxChecked: boolean;
    center: Location;
    userLocation: Location;
    setCenter: ({ lat, lng }: Location) => void;
    setUserLocation: ({ lat, lng }: Location) => void;
}

export default function MapGoogle({
    isCheckboxChecked,
    center,
    userLocation,
    setCenter,
    setUserLocation,
}: IMapGoogleProps) {
    const [directions, setDirections] = useState<DirectionsResult>();
    const options = useMemo(
        () => ({
            mapId: "6d1d08f0d0fcf525",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const randomLocations = useMemo(() => generateHouses(center), [center]);

    useEffect(() => {
        if (isCheckboxChecked) {
            setUserCurrentLocation();
        }
    }, [isCheckboxChecked]);

    function setUserCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
    }

    const fetchDirections = (house: LatLng) => {
        if (!userLocation) return;
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: userLocation,
                destination: house,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);
                }
            }
        );
    };
    return (
        <div className="google-map">
            <GoogleMap
                zoom={8}
                center={center}
                mapContainerClassName="map-container"
                options={options}
            >
                {userLocation && (
                    <>
                        <MarkerF
                            position={userLocation}
                            icon="/userLocation.svg"
                        />
                    </>
                )}

                {/* {masters?.map((master) => {
						return (
							<MarkerF
								key={master.id}
								position={master.location}
								onClick={() => {
									fetchDirections(master.location);
									// show master info in popup
									getMasterById(master.id);
									setShowPopup(true);
								}}
								icon={`/service-icon-type-${serviceType}.svg`}
							/>
						);
					})} */}

                {randomLocations.map((house) => {
                    return (
                        <MarkerF
                            key={house.lat}
                            position={house}
                            onClick={() => {
                                console.log(house);
                                fetchDirections(house);
                            }}
                            icon="/location.svg"
                        />
                    );
                })}

                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                            zIndex: 50,
                            strokeColor: "#1976D2",
                            strokeWeight: 5,
                        },
                    }}
                />
            </GoogleMap>
        </div>
    );
}

const generateHouses = (position: Location) => {
    const _houses: Array<Location> = [];
    for (let i = 0; i < 10; i++) {
        const direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction,
        });
    }
    return _houses;
};
