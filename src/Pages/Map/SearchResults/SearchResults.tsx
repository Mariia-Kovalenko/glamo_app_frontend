import Button from "../../../common/Button/Button";
import Loader from "../../../common/Loader/Loader";
import { API_URL, USERS } from "../../../constants";
import { MasterData } from "../Map";
import { MastersView } from "./MastersView";
import "./SearchResults.scss";

export type MasterInfoType = {
    _id: string;
    email: string;
    username: string;
    services: string[];
    role: string;
    phone?: string;
    address?: string;
    profileImage?: string;
};

export default function SearchResults({
    masters,
    isLoading,
    requestError,
    handleFetchDirection,
}: {
    masters: MasterInfoType[];
    isLoading: boolean;
    requestError: { error: boolean; message: string };
    handleFetchDirection: (id: string) => void;
}) {
    return (
        <div className="results">
            <h5 className="results__title">
                <span>{masters ? masters.length : 0}</span> Results
            </h5>

            {isLoading ? (
                <div className="results__inner">
                    <Loader />
                </div>
            ) : requestError.error ? (
                <div className="results__inner">
                    <div className="no-results">
                        <div className="error">{requestError.message}</div>
                    </div>
                </div>
            ) : (
                <MastersView
                    masters={masters}
                    handleFetchDirection={handleFetchDirection}
                />
            )}
        </div>
    );
}
