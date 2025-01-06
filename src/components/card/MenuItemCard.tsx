import "./menu-item-card.css";

interface ItemCardProps {
    name: string;
    description: string;
    image: string;
    price: number;
}

export function ItemCard({ name, description, image, price }: ItemCardProps) {
    const formattedPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="menu-item-card">
            <img src={`http://localhost:8080${image}`} alt={name} />
            <h2>{name}</h2>
            <div className="menu-item-card-description"><p>{description}</p></div>
            <div className="menu-item-card-price"><p>R$ {formattedPrice}</p></div>
        </div>
    );
}