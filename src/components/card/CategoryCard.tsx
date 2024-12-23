import "./category-card.css";
import { useNavigate, useLocation } from "react-router";

interface CategoryCardProps {
    name: string;
    image: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function CategoryCard({ name, image, onEdit = () => {}, onDelete = () => {} }: CategoryCardProps) {
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
        <div className="card">
            <img src={`data:image/jpeg;base64,${image}`} alt={name} onClick={handleClick} />
            <h2 onClick={handleClick}>{name}</h2>
            {location.pathname.startsWith('/cozinha/cardapio') && (
                <>
                    <button className="update-category-button" onClick={onEdit}>Editar</button>
                    <button className="delete-category-button" onClick={onDelete}>Deletar</button>
                </>
            )}
        </div>
    );
}