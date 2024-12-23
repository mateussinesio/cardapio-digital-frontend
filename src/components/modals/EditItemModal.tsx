import { useState, useEffect } from "react";
import { ItemData } from "../../interface/item-data";
import { updateItem } from "../../hooks/update-item";

import "./edit-item-modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    );
};

interface EditItemModalProps {
    isVisible: boolean;
    handleClose: () => void;
    initialData: ItemData; // Dados iniciais do item
}

export function EditItemModal({ isVisible, handleClose, initialData }: EditItemModalProps) {
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description);
    const [image, setImage] = useState(initialData.image);
    const [price, setPrice] = useState(initialData.price);
    const { mutate } = updateItem(initialData.id ? initialData.id.toString() : ""); // Converta o id para string

    useEffect(() => {
        setName(initialData.name);
        setDescription(initialData.description);
        setImage(initialData.image);
        setPrice(initialData.price);
    }, [initialData]);

    const submit = () => {
        const itemData: ItemData = {
            id: initialData.id ? initialData.id.toString() : "", // Converta o id para string
            name,
            description,
            image,
            price,
            category: initialData.category // Mantenha a categoria existente
        };

        mutate(itemData);
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="overlay">
            <div className="container">
                <h2>Editar item</h2>
                <form className="input-container">
                    <Input label="Nome:" value={name} updateValue={setName}></Input>
                    <Input label="Descrição:" value={description} updateValue={setDescription}></Input>
                    <Input label="Imagem:" value={image} updateValue={setImage}></Input>
                    <Input label="Preço:" value={price} updateValue={setPrice}></Input>
                </form>
                <div className="buttons-container">
                    <button onClick={submit} className="submit-button">Salvar</button>
                    <button onClick={handleClose} className="close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}