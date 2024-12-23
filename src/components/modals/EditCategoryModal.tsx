import { useState } from "react";
import { CategoryData } from "../../interface/category-data";
import { updateCategory } from "../../hooks/update-category";

import "./edit-category-modal.css";

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

interface EditCategoryModalProps {
    isVisible: boolean;
    handleClose: () => void;
    initialData: CategoryData;
}

export function EditCategoryModal({ isVisible, handleClose, initialData }: EditCategoryModalProps) {
    const [name, setName] = useState(initialData.name);
    const [image, setImage] = useState(initialData.image);
    const { mutate } = updateCategory(initialData.id ? initialData.id.toString() : "");

    const submit = () => {
        const categoryData: CategoryData = {
            id: initialData.id ? initialData.id.toString() : "",
            name,
            image
        };

        mutate(categoryData);
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="overlay">
            <div className="container">
                <h2>Editar categoria</h2>
                <form className="input-container">
                    <Input label="Nome:" value={name} updateValue={setName}></Input>
                    <Input label="Imagem:" value={image} updateValue={setImage}></Input>
                </form>
                <div className="buttons-container">
                    <button onClick={submit} className="submit-button">Salvar</button>
                    <button onClick={handleClose} className="close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}