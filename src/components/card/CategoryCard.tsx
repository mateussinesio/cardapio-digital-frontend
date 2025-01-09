import "./category-card.css";
import { useNavigate, useLocation } from "react-router";

interface CategoryCardProps {
    name: string;
    image?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function CategoryCard({ name, image, onEdit = () => { }, onDelete = () => { } }: CategoryCardProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname.startsWith('/cozinha/cardapio')) {
            navigate(`/cozinha/cardapio/${name}`);
        } else {
            navigate(`/cardapio/${name}`);
        }
    };

    return (
        <div className="category-card">
            <div className="category-card-image-container" onClick={handleClick}>
                {image ? (
                    <img src={`http://localhost:8080${image}`} alt={name} />
                ) : (
                    <div className="category-no-image-placeholder"></div>
                )}
                <h2>{name}</h2>
            </div>
            {location.pathname.startsWith('/cozinha/cardapio') && (
                <div className="category-card-buttons">
                    <button className="kitchen-update-category-button" onClick={onEdit}>Editar</button>
                    <button className="kitchen-delete-category-button" onClick={onDelete}>Deletar</button>
                </div>
            )}
        </div>
    );
}
