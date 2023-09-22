import { useState } from "react";
import { TAB1, TAB2 } from "../../../constants";
import TabNavItem from "../../../common/TabNavItem/TabNavItem";
import TabContent from "../../../common/TabContent/TabContent";
import './ProfileTabs.scss';
import EditProfile from "./EditProfile";
import { UserInfo } from "../Profile";

export default function ProfileTabs({userInfo} : {userInfo: UserInfo}) {
    const [activeTab, setActiveTab] = useState(TAB2);

    return (
        <div className="tabs-container tabs">
            <ul className="tabs__list">
                <TabNavItem
                    id={TAB1}
                    title={'My Works'}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    id={TAB2}
                    title={'Edit Profile'}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </ul>
            <div className="tabs__content">
                <TabContent id={TAB1} activeTab={activeTab} >
                    Tab 1
                </TabContent>
                <TabContent id={TAB2} activeTab={activeTab} >
                    <EditProfile userInfo={userInfo}/>
                </TabContent>
            </div>
        </div>
    )
}