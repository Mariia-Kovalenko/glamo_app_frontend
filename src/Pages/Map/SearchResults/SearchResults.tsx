import Button from "../../../common/Button/Button";
import Loader from "../../../common/Loader/Loader";
import { API_URL, USERS } from "../../../constants";
import { MasterData } from "../Map";
import "./SearchResults.scss";

export type MasterInfoType = {
    id: string;
    email: string;
    username: string;
    services: string[];
    role: string;
    address?: string;
    profileImage?: string;
};

const servicesMap = new Map([
    ["1", "Makeup"],
    ["2", "Hair"],
    ["3", "Brows"],
    ["4", "Nails"],
    ["5", "Cosmetology"],
    ["6", "Massage"],
]);

export default function SearchResults({
    masters,
    isLoading,
}: {
    masters: MasterInfoType[];
    isLoading: boolean;
}) {
    function getServices(services: string[]) {
        return services
            .map((serviceId) => servicesMap.get(serviceId))
            .join(", ")
            .trim();
    }

    return (
        <div className="results">
            <h5 className="results__title">
                <span>{masters ? masters.length : 0}</span> Results
            </h5>

            <div className="results__inner">
                {isLoading ? (
                    <Loader />
                ) : masters ? (
                    masters.map((master) => {
                        return (
                            <div key={master.id} className="card">
                                <div className="card__image">
                                    <img
                                        src={
                                            master.profileImage
                                                ? `${API_URL}${USERS}profile-image/${master.profileImage}`
                                                : "./Avatar-default.svg"
                                        }
                                        alt="userphoto"
                                    />
                                </div>
                                <div className="card__inner">
                                    <div className="card__top">
                                        <div className="card__username">
                                            {master.username}
                                        </div>
                                        <div className="card__services">
                                            {getServices(master.services)}
                                        </div>
                                    </div>
                                    <div className="card__user-details details">
                                        {master.address && (
                                            <div className="details__item">
                                                <img
                                                    src="./location-icon.svg"
                                                    alt=""
                                                />
                                                <span>{master.address}</span>
                                            </div>
                                        )}

                                        <div className="details__item">
                                            <img src="./Calendar.svg" alt="" />
                                            <span>
                                                Mon. - Fri. 17.00- 19.00
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        text={"see on map"}
                                        fullWidth
                                        color="light"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-results">
                        Start Searching for Beauty Masters!
                    </div>
                )}
            </div>
        </div>
    );
}
