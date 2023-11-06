import { useEffect, useState } from "react";
import Chip from "../../common/Chip/Chip";
import FileUploaderComponent from "../../common/FileUploader/FileUploader";
import { API_URL, USERS } from "../../constants";
import { masters, servicesList } from "../../mocks/mocks";
import "./Profile.scss";
import { UsersService } from "../../services/apiService";
import { IUserState, updateUserProfile } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileTabs from "./ProfileTabs/ProfileTabs";

const userMock = masters[0];

export type UserInfo = {
    id: string;
    username: string;
    email: string;
    role: string;
    address: string;
    profileImage: string;
    phone: string;
    services: string[];
};

export default function Profile() {
    const [uploadFile, setUploadFile] = useState(false);
    const user = useSelector((state: { user: IUserState }) => state.user);

    const [userInfo, setUserInfo] = useState<UserInfo>({
        id: "",
        username: user.username,
        email: "",
        role: user.role,
        address: "",
        profileImage: user.profileImage,
        phone: "",
        services: [],
    });

    const dispatch = useDispatch();

    useEffect(() => {
        fetchUser(user.token);
    }, []);

    const handleFileUpload = (formData: FormData) => {
        UsersService.uploadProfileImage(user.token, formData)
            .then((res) => {
                console.log('User Info received:', res);
                if (res.status === 201) {
                    setUploadFile(false);
                    fetchUser(user.token);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function fetchUser(token: string) {
        UsersService.getProfileInfo(token)
            .then((res) => {
                const {
                    username,
                    id,
                    email,
                    phone,
                    address,
                    profileImage,
                    role,
                    services,
                } = res.data;

                setUserInfo({
                    username,
                    id,
                    email,
                    address,
                    phone,
                    profileImage,
                    role,
                    services,
                });

                dispatch(updateUserProfile(profileImage));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__section bio">
                        <div className="bio__image">
                            <img
                                src={
                                    userInfo.profileImage
                                        ? `${API_URL}${USERS}profile-image/${userInfo.profileImage}`
                                        : "./Avatar-default.svg"
                                }
                                alt="profile-img"
                            />
                            <button
                                className="bio__upload-btn"
                                onClick={() => setUploadFile(true)}
                            >
                                <img src="/camera.svg" alt="upload" />
                            </button>
                        </div>
                        <div className="bio__user user">
                            <div className="user__name">
                                {userInfo.username}
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
                                    {userInfo.email}
                                </div>
                            </div>
                            <div className="info__item">
                                <div className="info__title">Address</div>
                                {userInfo.address ? (
                                    <div className="info__data">
                                        {userInfo.address}
                                    </div>
                                ) : (
                                    <div className="info__data no-data">
                                        Incomplete
                                    </div>
                                )}
                            </div>
                            <div className="info__item">
                                <div className="info__title">Phone</div>
                                {userInfo.phone ? (
                                    <div className="info__data">
                                        {userInfo.phone}
                                    </div>
                                ) : (
                                    <div className="info__data no-data">
                                        Incomplete
                                    </div>
                                )}
                            </div>
                            <div className="info__item">
                                <div className="info__title">Services</div>
                                <div className="info__services">
                                    {userInfo.services ? (
                                        userInfo.services.map((service) => {
                                            const type = servicesList.find(
                                                (item) =>
                                                    item.typeId === service
                                            );
                                            return type ? (
                                                <Chip
                                                    key={type._id}
                                                    text={type.name}
                                                    onClick={() => {}}
                                                />
                                            ) : null;
                                        })
                                    ) : (
                                        <div className="info__data no-data">
                                            Incomplete
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile__section tabs-section">
                        <ProfileTabs userInfo={userInfo} />
                    </div>
                </div>
            </div>
            {uploadFile && (
                <FileUploaderComponent
                    title="Upload profile image"
                    onClose={() => setUploadFile(false)}
                    handleFileUpload={handleFileUpload}
                />
            )}
        </div>
    );
}
