import Chip from "../../common/Chip/Chip";
import { API_URL, USERS } from "../../constants";
import { masters, servicesList } from "../../mocks/mocks";
import "./Profile.scss";

const userMock = masters[0];

export default function Profile() {
    return (
        <div className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__section bio">
                        <div className="bio__image">
                            <img
                                src={
                                    userMock.profileImage
                                        ? `${API_URL}${USERS}profile-image/${userMock.profileImage}`
                                        : "./Avatar-default.svg"
                                }
                                alt="profile-img"
                            />
                            <button className="bio__upload-btn">
                                <img src="/camera.svg" alt="upload" />
                            </button>
                        </div>
                        <div className="bio__user user">
                            <div className="user__name">
                                {userMock.username}
                            </div>
                            <div className="user__role">Beauty Master</div>
                            <div className="user__rating">
                                <img src="/star.svg" alt="star" />
                                <p>4.3</p>
                            </div>
                        </div>
                        <div className="bio__info info">
                            <div className="info__item">
                                <div className="info__title">Email</div>
                                <div className="info__data">
                                    {userMock.email}
                                </div>
                            </div>
                            <div className="info__item">
                                <div className="info__title">Address</div>
                                <div className="info__data">
                                    {userMock.address}
                                </div>
                            </div>
                            <div className="info__item">
                                <div className="info__title">Phone</div>
                                <div className="info__data">
                                    {userMock.phone}
                                </div>
                            </div>
                            <div className="info__item">
                                <div className="info__title">Services</div>
                                <div className="info__services">
                                    {userMock.services.map((service) => {
                                        const type = servicesList.find(
                                            (item) => item.typeId === service
                                        );
                                        return type ? (
                                            <Chip
                                                key={type._id}
                                                text={type.name}
                                                onClick={() => {}}
                                            />
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile__section tabs">tabs</div>
                </div>
            </div>
        </div>
    );
}
