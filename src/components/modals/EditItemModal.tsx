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
            <input value={value} onChange={event => updateValue(event.target.value)} />
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
    const [image, setImage] = useState<File | null>(null);  // A imagem agora é do tipo File
    const [price, setPrice] = useState(initialData.price);
    const { mutate } = updateItem(initialData.id ? initialData.id.toString() : "");

    useEffect(() => {
        setName(initialData.name);
        setDescription(initialData.description);
        setPrice(initialData.price);
    }, [initialData]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        if (image) {
            formData.append("image", image); // Anexando a imagem ao FormData
        }

        // A categoria é enviada com o valor já existente no initialData, sem necessidade de verificação
        if (initialData.category) {
            formData.append("category", initialData.category);
        }

        mutate(formData);  // Enviando FormData
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="edit-item-overlay">
            <div className="edit-item-container">
                <h2>Editar item</h2>
                <form className="edit-item-input-container">
                    <Input label="Nome:" value={name} updateValue={setName} />
                    <Input label="Descrição:" value={description} updateValue={setDescription} />
                    <Input label="Preço:" value={price} updateValue={setPrice} />
                    <label>Imagem:</label>
                    <input type="file" onChange={handleImageChange} />
                </form>
                <div className="edit-item-buttons-container">
                    <button onClick={submit} className="submit-button">Salvar</button>
                    <button onClick={handleClose} className="close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}
