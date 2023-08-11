import { useState, useEffect } from "react";
import Avatar from "../../common/Avatar/Avatar";
import Button from "../../common/Button/Button";
import "./Header.scss";

export default function Header() {
    const isAuth = true;
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [burgerClassName, setBurgerClassName] = useState('burger open');
    const [navClassName, setNavClassName] = useState('nav close');

    const toggleSideMenu = () => {
        setIsMenuOpened((prev) => !prev);
        if (!isMenuOpened) {
            setBurgerClassName('burger close');
            setNavClassName('nav open');
        } else {
            setBurgerClassName('burger open');
            setNavClassName('nav close');
        }
    }

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
                            <a href="#" className="nav__link">
                                Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#" className="nav__link active">
                                Beauty masters
                            </a>
                        </li>
                        {!isAuth ? (
                            <li className="nav__item">
                                <Button
                                    text={"Sign In"}
                                    color="light"
                                    onClick={() => {}}
                                />
                            </li>
                        ) : (
                            <Avatar src="./user.jpg" />
                        )}
                        {!isAuth ? (
                            <li className="nav__item">
                                <Button text={"Register"} onClick={() => {}} />
                            </li>
                        ) : (
                            <li className="nav__item">
                                <Button
                                    text={"Log out"}
                                    color="light"
                                    onClick={() => {}}
                                />
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
