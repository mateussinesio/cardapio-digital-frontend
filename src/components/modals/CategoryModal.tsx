import { useState } from "react";
import { addCategory } from "../../hooks/add-category";

import "./category-modal.css";

interface InputProps {
    label: string;
    value: string | number | readonly string[] | undefined | File;
    updateValue(value: any): void;
    type?: string;
}

const Input = ({ label, value, updateValue, type = "text" }: InputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "file" && event.target.files) {
            updateValue(event.target.files[0]);
        } else {
            updateValue(event.target.value);
        }
    };

    return (
        <>
            <label>{label}</label>
            {type === "file" ? (
                <input type={type} onChange={handleChange} />
            ) : (
                <input type={type} value={value as string | number | readonly string[] | undefined} onChange={handleChange} />
            )}
        </>
    );
};

interface CreateModalProps {
    isVisible: boolean;
    handleClose: () => void;
}

export function CategoryModal({ isVisible, handleClose }: CreateModalProps) {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | undefined>(undefined);
    const { mutate } = addCategory();

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        mutate(formData);
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="add-category-modal-overlay">
            <div className="add-category-modal-container">
                <h2>Adicionar uma categoria no cardápio</h2>
                <form className="add-category-modal-input-container">
                    <Input label="Nome:" value={name} updateValue={setName} />
                    <Input label="Imagem:" value={undefined} updateValue={setImage} type="file" />
                </form>
                <div className="add-category-modal-buttons-container">
                    <button onClick={submit} className="submit-button">Adicionar</button>
                    <button onClick={handleClose} className="close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}