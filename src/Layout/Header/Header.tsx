import { useState } from "react";
import Avatar from "../../common/Avatar/Avatar";
import Button from "../../common/Button/Button";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUserState, logoutUser } from "../../store/user/userSlice";
import { API_URL, USERS } from "../../constants";
import { LocalStorageService } from "../../services/localStorageService";

export default function Header() {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [burgerClassName, setBurgerClassName] = useState("burger open");
    const [navClassName, setNavClassName] = useState("nav close");

    const dispatch = useDispatch();
    const user = useSelector((state: { user: IUserState }) => state.user);

    const toggleSideMenu = () => {
        setIsMenuOpened((prev) => !prev);
        if (!isMenuOpened) {
            setBurgerClassName("burger close");
            setNavClassName("nav open");
        } else {
            setBurgerClassName("burger open");
            setNavClassName("nav close");
        }
    };

    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser);
        LocalStorageService.removeUserFromLocal();
        navigate(0);
    };

    return (
        <header className="header">
            <div className="header__inner">
                <div className="logo">
                    <span>Glamo</span>
                    <span></span>
                    <span>
                        find your
                        <br />
                        beauty
                    </span>
                </div>
                <button className="burger-btn" onClick={toggleSideMenu}>
                    <div className={burgerClassName}>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <nav className={navClassName}>
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink
                                to="/home"
                                className={({ isActive }) =>
                                    isActive ? "nav__link active" : "nav__link"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                to="/map"
                                className={({ isActive }) =>
                                    isActive ? "nav__link active" : "nav__link"
                                }
                            >
                                Beauty masters
                            </NavLink>
                        </li>
                        {!user.isAuth ? (
                            <li className="nav__item">
                                <Button
                                    text={"Sign In"}
                                    color="light"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                />
                            </li>
                        ) : (
                            <button onClick={() => navigate("/profile")}>
                                <Avatar
                                    src={
                                        user.profileImage
                                            ? `${API_URL}${USERS}profile-image/${user.profileImage}`
                                            : "./Avatar-default.svg"
                                    }
                                />
                            </button>
                        )}
                        {!user.isAuth ? (
                            <li className="nav__item">
                                <Button
                                    text={"Register"}
                                    onClick={() => {
                                        navigate("/register");
                                    }}
                                />
                            </li>
                        ) : (
                            <li className="nav__item">
                                <Button
                                    text={"Log out"}
                                    color="light"
                                    onClick={logout}
                                />
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
