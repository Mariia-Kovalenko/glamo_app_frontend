import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import "./NotFound.scss";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="not-found">
            <div className="not-found__status">404</div>
            <div className="not-found__message">
                Oops! Seems like the page you are requesting does not exist.
            </div>
            <div className="not-found__action">
                <Button text="Go back" fullWidth onClick={() => navigate(-1)} />
            </div>
        </div>
    );
}
