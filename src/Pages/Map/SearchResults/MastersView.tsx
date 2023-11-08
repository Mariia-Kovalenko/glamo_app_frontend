import { MasterInfoType } from "./SearchResults";
import { API_URL, USERS } from "../../../constants";
import Button from "../../../common/Button/Button";

const servicesMap = new Map([
    ["1", "Makeup"],
    ["2", "Hair"],
    ["3", "Brows"],
    ["4", "Nails"],
    ["5", "Cosmetology"],
    ["6", "Massage"],
]);

export function MastersView({
    masters,
    handleFetchDirection,
}: {
    masters: MasterInfoType[];
    handleFetchDirection: (id: string) => void;
}) {
    function getServices(services: string[]) {
        return services
            .map((serviceId) => servicesMap.get(serviceId))
            .join(" • ")
            .trim();
    }
    return (
        <div className="results__inner">
            {masters && masters.length ? (
                masters.map((master) => {
                    return (
                        <div key={master._id} className="card">
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

                                    {master.phone && (
                                        <div className="details__item">
                                            <img src="./phone.svg" alt="" />
                                            <span>{master.phone}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="card__user-actions">
                                    <Button
                                        text={"see on map"}
                                        fullWidth
                                        color="light"
                                        size="small"
                                        onClick={() => {
                                            handleFetchDirection(master._id);
                                        }}
                                    />
                                    <Button
                                        text={"view profile"}
                                        fullWidth
                                        size="small"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
            ) :  (
                <div className="no-results">
                    No results Yet! <br/> Start Searching for Beauty Masters!
                </div>
            )}
        </div>
    );
}
