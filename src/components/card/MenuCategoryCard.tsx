import "./menu-category-card.css";
import { useNavigate, useLocation } from "react-router";

interface CategoryCardProps {
    name: string;
    image: string;
}

export function CategoryCard({ name, image }: CategoryCardProps) {
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
        <div className="menu-category-card">
            <img src={`http://localhost:8080${image}`} alt={name} onClick={handleClick} />
            <h2 onClick={handleClick}>{name}</h2>
        </div>
    );
}