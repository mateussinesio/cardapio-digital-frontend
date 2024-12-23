import { useState } from "react";
import { ItemData } from "../../interface/item-data";
import { addItem } from "../../hooks/add-item";
import { showCategories } from "../../hooks/show-categories";
import { deleteItem } from "../../hooks/delete-item";

import "./item-modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
    formatValue?(value: any): string;
}

const Input = ({ label, value, updateValue, formatValue }: InputProps) => {
    const formattedValue = formatValue ? formatValue(value) : value;

    return (
        <>
            <label>{label}</label>
            <input value={formattedValue} onChange={event => updateValue(event.target.value)}></input>
        </>
    );
}

interface ItemModalProps {
    isVisible: boolean;
    handleClose: () => void;
    itemId?: string;
}

export function ItemModal({ isVisible, handleClose, itemId }: ItemModalProps) {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const { mutate } = addItem();
    const { data: categories, isLoading, error } = showCategories();

    const formatPrice = (price: { toLocaleString: (arg0: string, arg1: { minimumFractionDigits: number; maximumFractionDigits: number; }) => any; }) => {
        return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const submit = () => {
        const formattedPrice = price.toString().replace(',', '.');
        const itemData: ItemData = {
            name,
            image,
            price: parseFloat(formattedPrice),
            category,
            description,
        }

        mutate(itemData);
        handleClose();
    }

    const handleDelete = () => {
        if (itemId) {
            deleteItem(itemId);
            handleClose();
        }
    }

    if (!isVisible) return null;

    return (
        <div className="item-modal-overlay">
            <div className="item-modal-container">
                <h2>Adicionar um item no cardápio</h2>
                <form className="item-modal-input-container">
                    {isLoading ? (
                        <p>Carregando categorias...</p>
                    ) : error ? (
                        <p>Erro ao carregar as categorias.</p>
                    ) : (
                        <div>
                            <label>Categoria:</label>
                            <select value={category} onChange={event => setCategory(event.target.value)}>
                                <option value="">Selecione uma categoria</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <Input label="Nome:" value={name} updateValue={setName}></Input>
                    <Input label="Descrição:" value={description} updateValue={setDescription}></Input>
                    <Input label="Imagem:" value={image} updateValue={setImage}></Input>
                    <Input label="Preço:" value={price} updateValue={setPrice} formatValue={formatPrice}></Input>
                </form>
                <div className="item-modal-buttons-container">
                    <button onClick={submit} className="item-modal-submit-button">Adicionar</button>
                    <button onClick={handleClose} className="item-modal-close-button">Fechar</button>
                    {itemId && (
                        <button onClick={handleDelete} className="item-modal-delete-button">Deletar</button>
                    )}
                </div>
            </div>
        </div>
    );
}