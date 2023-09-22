import './TabNavItem.scss';

type TabNavItemProps = {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
};

const TabNavItem = ({
    id,
    title,
    activeTab,
    setActiveTab,
}: TabNavItemProps) => {
    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <li
            onClick={handleClick}
            className={activeTab === id ? "tabs__name active" : "tabs__name"}
        >
            <button>{title}</button>
        </li>
    );
};
export default TabNavItem;
