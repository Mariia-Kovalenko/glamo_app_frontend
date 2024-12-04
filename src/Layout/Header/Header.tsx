import { useState, useEffect } from "react";
import Avatar from "../../common/Avatar/Avatar";
import Button from "../../common/Button/Button";
import "./Header.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUserState, logoutUser } from "../../store/user/userSlice";
import { LocalStorageService } from "../../services/localStorageService";

export default function Header() {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [burgerClassName, setBurgerClassName] = useState("burger open");
    const [navClassName, setNavClassName] = useState("nav close");

    const dispatch = useDispatch();
    const user = useSelector((state: { user: IUserState }) => state.user);

    const navigate = useNavigate();
    const location = useLocation();

    const toggleSideMenu = () => {
        setIsMenuOpened((prev) => !prev);
        if (!isMenuOpened) {
            setBurgerClassName("burger close");
            setNavClassName("nav open");
            document.body.style.overflow = "hidden";
        } else {
            setBurgerClassName("burger open");
            setNavClassName("nav close");
            document.body.style.overflow = "auto";
        }
    };

    const logout = () => {
        dispatch(logoutUser());
        LocalStorageService.removeUserFromLocal();
        navigate('/map');
    };

    // Close the navigation menu and reset body overflow on route change
    useEffect(() => {
        if (isMenuOpened) {
            console.log('close menu')
            setIsMenuOpened(false);
            setBurgerClassName("burger open");
            setNavClassName("nav close");
            document.body.style.overflow = "auto";
        }
    }, [location.pathname]); // Run this effect whenever the route changes

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
                                        document.body.style.overflow = "auto";
                                        navigate("/login");
                                    }}
                                />
                            </li>
                        ) : (
                            <li className="nav__item">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav__link active"
                                            : "nav__link"
                                    }
                                >
                                    <Avatar
                                        src={
                                            user.profileImage
                                                || "./Avatar-default.svg"
                                        }
                                    />
                                </NavLink>
                            </li>
                        )}
                        {!user.isAuth ? (
                            <li className="nav__item">
                                <Button
                                    text={"Register"}
                                    onClick={() => {
                                        document.body.style.overflow = "auto";
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
