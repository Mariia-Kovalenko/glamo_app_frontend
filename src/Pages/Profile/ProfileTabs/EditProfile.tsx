import { useEffect, useState } from "react";
import Input from "../../../common/Input/Input";
import Places from "../../Map/MapFilters/Places/Places";
import "./ProfileTabs.scss";
import { useLoadScript } from "@react-google-maps/api";
import { LIBRARIES } from "../../../constants";
import Button from "../../../common/Button/Button";
import { servicesList } from "../../../mocks/mocks";
import Chip from "../../../common/Chip/Chip";
import { UserInfo } from "../Profile";
import { useFormik } from "formik";
import { UsersService } from "../../../services/apiService";
import { IUserState, Role } from "../../../store/user/userSlice";
import { useSelector } from "react-redux";

export default function EditProfile({
    userInfo,
    fetchUser,
}: {
    userInfo: UserInfo;
    fetchUser: (token: string) => void;
}) {
    const user = useSelector((state: { user: IUserState }) => state.user);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDBaWV6UYaOYLjYHEc0KHTAcs5bFQW51k0",
        libraries: ["places"],
    });
    const [userLocation, setUserLocation] = useState({
        lat: 50.4226558,
        lng: 30.3810942,
    });
    const [userServicesList, setUserServicesList] = useState<string[]>([]);
    const [userAddress, setUserAddress] = useState<string>(userInfo.address);

    const { values, handleChange, setFieldValue } = useFormik({
        initialValues: {
            username: userInfo.username,
            email: userInfo.email,
            phone: userInfo.phone,
        },
        onSubmit: submit,
    });

    useEffect(() => {
        setFieldValue("username", userInfo.username);
        setFieldValue("email", userInfo.email);
        setFieldValue("phone", userInfo.phone);
        setUserAddress(userInfo.address);
        setUserServicesList(userInfo.services);
    }, [userInfo]);

    const handleUserLocation = (position: any) => {
        console.log("new Location:", position);
        setUserLocation(position);
    };

    const handleUserAddress = (address: string) => {
        console.log("new address:", address);
        setUserAddress(address);
    };

    const removeUserService = (id: string) => {
        const newList = userServicesList.filter((el) => el !== id);
        setUserServicesList(newList);
    };

    const addUserService = (id: string) => {
        setUserServicesList((prev) => [...prev, id]);
    };

    function submit() {
        console.log(
            userServicesList,
            userLocation,
            userAddress,
            values.email,
            values.phone,
            values.username
        );
        updateUser(
            user.role,
            user.token,
            values.username,
            values.email,
            values.phone,
            userAddress || "",
            userLocation || "",
            userServicesList
        );
    }

    function updateUser(
        role: Role,
        token: string,
        username: string,
        email: string,
        phone: string,
        address: string,
        location: { lat: string | number; lng: string | number },
        services: string[]
    ) {
        if (role === Role.MASTER) {
            UsersService.updateMaster(token, {
                username,
                email,
                phone,
                address,
                location,
                services,
            })
                .then((res) => {
                    // console.log('userUpdated', res);
                    fetchUser(user.token);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function clearForm() {
        setFieldValue("username", userInfo.username);
        setFieldValue("email", userInfo.email);
        setFieldValue("phone", userInfo.phone || "");
        setUserAddress(userInfo.address);
        setUserServicesList(userInfo.services);
    }

    return (
        <div className="edit-profile">
            <form className="edit-profile__form">
                <Input
                    name="username"
                    type="text"
                    placeholder=""
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    fullWidth
                    error={!values.username}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder=""
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth
                    error={!values.email}
                />
                {user.role === Role.MASTER && (
                    <>
                        <Input
                            name="phone"
                            type="text"
                            placeholder=""
                            label="Phone"
                            value={values.phone}
                            onChange={handleChange}
                            fullWidth
                            error={!values.phone}
                        />
                        <div className="">
                            <label className="label">New Address</label>
                            {isLoaded && (
                                <Places
                                    inputStyle="outlined"
                                    setUserLocation={handleUserLocation}
                                    setUserAddress={handleUserAddress}
                                    isCheckboxChecked={true}
                                    setIsCheckboxChecked={() => {}}
                                    error={!userAddress}
                                />
                            )}
                        </div>
                        <div className="">
                            <label className="label">Services</label>
                            <div className="services__list">
                                {servicesList.map((service) => {
                                    if (
                                        userServicesList.includes(
                                            service.typeId
                                        )
                                    ) {
                                        return (
                                            <Chip
                                                key={service._id}
                                                text={service.name}
                                                icon={"delete"}
                                                color="dark"
                                                onClick={() =>
                                                    removeUserService(
                                                        service.typeId
                                                    )
                                                }
                                            />
                                        );
                                    } else {
                                        return (
                                            <Chip
                                                key={service._id}
                                                text={service.name}
                                                icon={"add"}
                                                onClick={() =>
                                                    addUserService(
                                                        service.typeId
                                                    )
                                                }
                                            />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </>
                )}
            </form>
            <div className="edit-profile__actions">
                <Button
                    text={"cancel"}
                    color="light"
                    type="submit"
                    onClick={clearForm}
                />
                <Button text={"Save"} type="submit" onClick={submit} />
            </div>
        </div>
    );
}
