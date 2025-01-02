import "./item-card.css";
import { useNavigate, useLocation } from "react-router";

interface ItemCardProps {
    name: string;
    description: string;
    image: string;
    price: number;
    onUpdate?: () => void;
    onDelete?: () => void;
    showUpdateItemButton: boolean;
    showDeleteButton: boolean;
}

export function ItemCard({ name, description, image, price, onUpdate = () => { }, onDelete = () => { }, showUpdateItemButton, showDeleteButton }: ItemCardProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname.startsWith('/cozinha/cardapio')) {
            navigate(`/cozinha/cardapio/${name}`);
        } else {
            navigate(`/cardapio/${name}`);
        }
    };

    const formattedPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="item-card">
            <img src={`http://localhost:8080${image}`} alt={name} onClick={handleClick} />
            <h2 onClick={handleClick}>{name}</h2>
            <p>{description}</p>
            <p>R$ {formattedPrice}</p>
            {showDeleteButton && (
                <button className="delete-item-button" onClick={onDelete}>Deletar</button>
            )}
            {showUpdateItemButton && (
                <button className="update-item-button" onClick={onUpdate}>Editar</button>
            )}
        </div>
    );
}
