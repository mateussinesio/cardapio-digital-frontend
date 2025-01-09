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
    initialData: ItemData;
}

export function EditItemModal({ isVisible, handleClose, initialData }: EditItemModalProps) {
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description);
    const [image, setImage] = useState<string | undefined>(initialData.image);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [price, setPrice] = useState(initialData.price);
    const { mutate } = updateItem(initialData.id ? initialData.id.toString() : "");

    useEffect(() => {
        setName(initialData.name);
        setDescription(initialData.description);
        setPrice(initialData.price);
        setImage(initialData.image);
        setRemoveImage(false);
    }, [initialData]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setImage(undefined);
        setImageFile(null);
        setRemoveImage(true);
    };

    const isFormChanged = name !== initialData.name || imageFile !== null || removeImage;

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        if (imageFile) {
            formData.append("image", imageFile);
        }
        formData.append("removeImage", removeImage.toString());

        if (initialData.category) {
            formData.append("category", initialData.category);
        }

        mutate(formData);
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
                    {image && !imageFile && (
                        <div className="image-preview">
                            <img src={image.startsWith('http') ? image : `http://localhost:8080${image}`} alt="Preview" />
                            <button type="button" onClick={handleRemoveImage}>Remover imagem</button>
                        </div>
                    )}
                    {imageFile && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(imageFile)} alt="Preview" />
                            <button type="button" onClick={handleRemoveImage}>Remover imagem</button>
                        </div>
                    )}
                </form>
                <div className="edit-item-buttons-container">
                    <button
                        onClick={submit}
                        className="edit-item-submit-button"
                        disabled={!isFormChanged}
                    >
                        Salvar
                    </button>
                    <button onClick={handleClose} className="edit-item-close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}
