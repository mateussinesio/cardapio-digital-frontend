import "./item-card.css";

interface ItemCardProps {
    name: string;
    description: string;
    image?: string;
    price: number;
    onUpdate?: () => void;
    onDelete?: () => void;
    showUpdateItemButton: boolean;
    showDeleteButton: boolean;
}

export function ItemCard({ name, description, image, price, onUpdate = () => { }, onDelete = () => { }, showUpdateItemButton, showDeleteButton }: ItemCardProps) {
    const formattedPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="item-card">
            {image ? (
                <img src={`http://localhost:8080${image}`} alt={name} />
            ) : (
                <div className="no-image-placeholder"></div>
            )}
            <h2>{name}</h2>
            <div className="item-card-description">{description}</div>
            <div className="item-card-price"><p>R$ {formattedPrice}</p></div>
            <div className="item-card-buttons">
                {showUpdateItemButton && (
                    <button className="update-item-button" onClick={onUpdate}>Editar</button>
                )}
                {showDeleteButton && (
                    <button className="delete-item-button" onClick={onDelete}>Deletar</button>
                )}
            </div>
        </div>
    );
}
