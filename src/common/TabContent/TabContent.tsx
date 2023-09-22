type TabContentProps = {
    id: string;
    activeTab: string;
    children: string | JSX.Element | JSX.Element[];
}

const TabContent = ({ id, activeTab, children }: TabContentProps) => {
    return (
        activeTab === id ? <div className="tabContent">
            {children}
        </div> : null
    )
};

export default TabContent;