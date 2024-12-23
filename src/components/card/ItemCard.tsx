import "./item-card.css";

interface ItemCardProps {
    name: string;
    description: string;
    image: string;
    price: number;
    onUpdate: () => void;
    onDelete: () => void;
    showUpdateItemButton: boolean;
    showDeleteButton: boolean;
}

export function ItemCard({ name, description, image, price, onUpdate, onDelete, showUpdateItemButton, showDeleteButton }: ItemCardProps) {
    const formattedPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="item-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>R$ {formattedPrice}</p>
            {showDeleteButton && (
                <button onClick={onDelete} className="delete-item-button">Deletar</button>
            )}
            {showUpdateItemButton && (
                <button onClick={onUpdate} className="update-item-button">Editar</button>
            )}
        </div>
    );
}