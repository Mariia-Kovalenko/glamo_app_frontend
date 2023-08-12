import './Category.scss';

interface ICategoryProps {
    id: string;
    name: string;
    isSelected: boolean;
    selectCategory: (id: string) => void;
}

export default function Category({id, name, isSelected, selectCategory}: ICategoryProps) {
    const categoryClass = !isSelected ? 'category' : 'category selected';
    const categoryIconSrc = `./Icon-${isSelected ? 'light' : 'dark'}-${name.toLowerCase()}.svg`;
    return (
        <button className={categoryClass} onClick={() => selectCategory(id)}>
            <div className="category__icon">
                <img src={categoryIconSrc} alt={name} />
            </div>
            <div className="category__name">{name}</div>
        </button>
    )
}