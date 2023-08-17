import Button from "../../../common/Button/Button";
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

export default function SearchResults({
    masters,
}: {
    masters: MasterInfoType[];
}) {
    return (
        <div className="results">
            <h5 className="results__title">
                <span>{masters ? masters.length : 0}</span> Results
            </h5>

            <div className="results__inner">
                {masters ? (
                    masters.map((master) => {
                        return (
                            <div key={master.id} className="card">
                                <div className="card__image">
                                    <img src="./user.jpg" alt="" />
                                </div>
                                <div className="card__inner">
                                    <div className="card__top">
                                        <div className="card__username">
                                            {master.username}
                                        </div>
                                        <div className="card__services">
                                            Makeup, Nails
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
                                        text={"see profile"}
                                        fullWidth
                                        color="light"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-results">Start Searching for Beauty Masters!</div>
                )}
            </div>
        </div>
    );
}
